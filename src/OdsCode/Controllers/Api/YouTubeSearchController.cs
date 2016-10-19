using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OdsCode.Repository;
using OdsCode.Services;
using Microsoft.Extensions.Logging;
using OdsCode.ViewModels;

namespace OdsCode.Controllers.Api
{
    [Route("api/youtube/{ytQuery}")]
    public class YouTubeSearchController : Controller
    {
        private YouTubeSearchService _youTubeSearchService;
        private ILogger<YouTubeSearchController> _logger;

        public YouTubeSearchController(ILogger<YouTubeSearchController> logger,
            YouTubeSearchService youTubeSearchService)
        {
            _logger = logger;
            _youTubeSearchService = youTubeSearchService;
        }

        [HttpGet("")]
        public async Task<JsonResult> Get(string ytQuery)
        {
            try
            {
                var ytSearch = _youTubeSearchService;

                YouTubeSearchResult ytResult = await ytSearch.SearchYouTubeAsync(ytQuery);

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(ytResult);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get youtube search results: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
        }
    }
}
