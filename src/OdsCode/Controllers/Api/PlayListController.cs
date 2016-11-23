using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OdsCode.Repository;
using Microsoft.Extensions.Logging;
using AutoMapper;
using System.Net;
using OdsCode.Models;
using OdsCode.Services;
using OdsCode.ViewModels;

namespace OdsCode.Controllers.Api
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Route("api/playlists/")]
    public class PlayListController : Controller
    {
        private ILogger<PlayListController> _logger;
        private IWorldRepository _repository;
        private YouTubeVideoSearchService _youTubeVideoSearchService;

        public PlayListController(IWorldRepository repository,
            ILogger<PlayListController> logger, YouTubeVideoSearchService youTubeVideoSearchService)
        {
            _repository = repository;
            _logger = logger;
            _youTubeVideoSearchService = youTubeVideoSearchService;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            try
            {
                var playlists = _repository.GetAllPlayLists(User.Identity.Name);
                var results = Mapper.Map<IEnumerable<PlayListViewModel>>(playlists);
                if (results != null)
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(results);
                }
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get all play-lists: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }


        }
        [HttpGet("{playListId}")]
        public async Task<JsonResult> Get(int playListId)
        {
            try
            {
                PlayList playlist = _repository.GetAPlayList(User.Identity.Name, playListId);
                var ytQuery = new Video();
                ytQuery = playlist.Videos;


                if (playlist != null)
                {
                    if (ytQuery != null)
                    {
                        var ytVideoSearch = _youTubeVideoSearchService;
                        YouTubeVideoSearchResult ytVideoResult;
                        ytVideoResult = await ytVideoSearch.GetYouTubeByIdsAsync(ytQuery.YtVideoString);
                        playlist.Videos.YtPlayListInfo = ytVideoResult.SearchResults;
                    }
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(playlist);
                }

                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(playlist);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get play-list with videos: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpDelete("{playListId}")]
        public async Task<JsonResult> Delete(int playListId)
        {
            try
            {
                var playlist = _repository.DeleteAPlayList(User.Identity.Name, playListId);
                var results = Mapper.Map<PlayListViewModel>(playlist);

                if (playlist != null)
                {
                    if (await _repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.OK;
                        return Json(null);
                    }
                }
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(null);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to delete play-list: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpPost("")]
        public async Task<JsonResult> Post([FromBody]PlayListViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newPlayList = Mapper.Map<PlayList>(vm);

                    newPlayList.UserName = User.Identity.Name;

                    // Save to the Database
                    _logger.LogInformation("Attempting to save a new play-list");
                    _repository.AddAPlayList(User.Identity.Name, newPlayList);

                    if (await _repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<PlayListViewModel>(newPlayList));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new play-list", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}
