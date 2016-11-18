using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OdsCode.Services;
using Microsoft.Extensions.Logging;

namespace OdsCode.Controllers.Api
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Route("api/youtube/")]
    public class YouTubeSearchController : Controller
    {
        private YouTubeSearchService _youTubeSearchService;
        private YouTubeVideoSearchService _youTubeVideoSearchService;
        private ILogger<YouTubeSearchController> _logger;

        public YouTubeSearchController(ILogger<YouTubeSearchController> logger,
            YouTubeSearchService youTubeSearchService, YouTubeVideoSearchService youTubeVideoSearchService)
        {
            _logger = logger;
            _youTubeSearchService = youTubeSearchService;
            _youTubeVideoSearchService = youTubeVideoSearchService;
        }

        [HttpGet("autocomplete")]
        public async Task<JsonResult> Autocomplete([FromQuery]string q)
        {
            try
            {
                var ytSearch = _youTubeSearchService;

                YouTubeSearchResult ytResult = await ytSearch.SearchYouTubeAsync(q);

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(ytResult);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get youtube search results: {0}", ex);
                //return BadRequest("Failed to get search results");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpGet("get")]
        public async Task<JsonResult> Get([FromQuery]string playlist)
        {
            try
            {
                var ytVideoSearch = _youTubeVideoSearchService;
                YouTubeVideoSearchResult ytVideoResult;

                ytVideoResult = await ytVideoSearch.GetYouTubeByIdsAsync(playlist);

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(ytVideoResult);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get youtube search results: {0}", ex);
                //return BadRequest("Failed to get search results");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpGet("search")]
        public async Task<JsonResult> Search([FromQuery]string q, [FromQuery]string pageToken)
        {
            try
            {
                var ytVideoSearch = _youTubeVideoSearchService;
                YouTubeVideoSearchResult ytVideoResult;

                if (pageToken == null)
                {
                    ytVideoResult = await ytVideoSearch.SearchYouTubeAsync(q);
                }
                else
                {
                    ytVideoResult = await ytVideoSearch.SearchYouTubeAsync(q, pageToken);
                }

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(ytVideoResult);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get youtube search results: {0}", ex);
                //return BadRequest("Failed to get search results");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { ex.Message });
            }
        }
    }
}
