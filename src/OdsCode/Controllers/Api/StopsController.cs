using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Models;
using OdsCode.Repository;
using OdsCode.Services;
using OdsCode.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace OdsCode.Controllers.Api
{
    [Route("api/trips/{tripId}/stops")]
    public class StopsController : Controller
    {
        private GeoCoordsService _coordsService;
        private ILogger<StopsController> _logger;
        private IWorldRepository _repository;

        public StopsController(IWorldRepository repository,
            ILogger<StopsController> logger,
            GeoCoordsService coordsService)
        {
            _repository = repository;
            _logger = logger;
            _coordsService = coordsService;
        }

        [HttpGet("")]
        public JsonResult Get(int tripId)
        {
            try
            {
                var trip = _repository.GetTripByName(tripId);

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(Mapper.Map<IEnumerable<StopViewModel>>(trip.Stops.OrderBy(s => s.StopDate).ToList()));
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get stops: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpPost("")]
        public async Task<JsonResult> Post(int tripId, [FromBody]StopViewModel vm)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var newStop = Mapper.Map<Stop>(vm);

                    _repository.AddStop(tripId, newStop);

                    if (await _repository.SaveChangesAsync())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Stop>(newStop));
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

        [HttpDelete("{stopId}")]
        public async Task<JsonResult> Delete(int tripId, int stopId)
        {
            try
            {
                var stop = _repository.DeleteUserTripStop(tripId, stopId, User.Identity.Name);
                var results = Mapper.Map<StopViewModel>(stop);

                if (results != null)
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
                _logger.LogError("Failed to delete trip: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }
        }

    }
}
