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
using OdsCode.ViewModels;

namespace OdsCode.Controllers.Api
{
    [Route("api/playlists")]
    public class PlayListController : Controller
    {
        private ILogger<PlayListController> _logger;
        private IWorldRepository _repository;

        public PlayListController(IWorldRepository repository,
            ILogger<PlayListController> logger)
        {
            _repository = repository;
            _logger = logger;
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

        [HttpGet("{playListsId}")]
        public JsonResult Get(int playListsId)
        {
            try
            {
                var playlist = _repository.GetUserPlayListWithVideos(playListsId, User.Identity.Name);
                var results = Mapper.Map<PlayListViewModel>(playlist);

                if (playlist != null)
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(results);
                }

                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get play-list with videos: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpDelete("{playListsId}")]
        public async Task<JsonResult> Delete(int playListsId)
        {
            try
            {
                var playlist = _repository.DeleteUserTripWithStops(playListsId, User.Identity.Name);
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
                    var newPlayLists = Mapper.Map<PlayList>(vm);

                    newPlayLists.UserName = User.Identity.Name;

                    // Save to the Database
                    _logger.LogInformation("Attempting to save a new play-list");
                    _repository.AddPlayList(newPlayLists);

                    if (await _repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<PlayListViewModel>(newPlayLists));
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
