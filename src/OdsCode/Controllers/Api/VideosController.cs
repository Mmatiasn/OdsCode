using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Models;
using OdsCode.Repository;
using OdsCode.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers.Api
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Route("api/videos/")]
    public class VideosController : Controller
    {
        private ILogger<VideosController> _logger;
        private IWorldRepository _repository;

        public VideosController(IWorldRepository repository,
            ILogger<VideosController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("")]
        public async Task<JsonResult> Post(int playListId, [FromBody]VideoViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newVideo = Mapper.Map<Video>(vm);

                    _repository.AddVideo(playListId, User.Identity.Name, newVideo);

                    if (await _repository.SaveChangesAsync())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Video>(newVideo));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new trip", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

    }
}
