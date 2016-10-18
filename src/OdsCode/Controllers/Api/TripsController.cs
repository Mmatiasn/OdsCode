using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Models;
using OdsCode.Repository;
using OdsCode.ViewModels;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace OdsCode.Controllers.Api
{
    [Route("api/trips")]
    [Authorize]
    public class TripsController : Controller
    {
        private ILogger<TripsController> _logger;
        private IWorldRepository _repository;

        public TripsController(IWorldRepository repository,
            ILogger<TripsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            try
            {
                var trips = _repository.GetAllTrips();
                var results = Mapper.Map<IEnumerable<TripViewModel>>(trips);
                if (trips != null)
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(results);
                }
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get all trips: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }


        }

        [HttpGet("{tripId}")]
        public JsonResult Get(int tripId)
        {
            try
            {
                var trips = _repository.GetUserTripWithStops(tripId, User.Identity.Name);
                var results = Mapper.Map<TripViewModel>(trips);

                if (trips != null)
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(results);
                }

                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get trip: {0}", ex);
                //return BadRequest("Failed to get stops");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpDelete("{tripId}")]
        public async Task<JsonResult> Delete(int tripId)
        {
            try
            {
                var trip = _repository.DeleteUserTripWithStops(tripId, User.Identity.Name);
                var results = Mapper.Map<TripViewModel>(trip);

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

        [HttpPost("")]
        public async Task<JsonResult> Post([FromBody]TripViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newTrip = Mapper.Map<Trip>(vm);

                    newTrip.UserName = User.Identity.Name;

                    // Save to the Database
                    _logger.LogInformation("Attempting to save a new trip");
                    _repository.AddTrip(newTrip);

                    if (await _repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<TripViewModel>(newTrip));
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
