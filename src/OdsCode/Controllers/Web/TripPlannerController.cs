using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Repository;
using System;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers.Web
{
    public class TripPlannerController : Controller
    {
        private ILogger<TripPlannerController> _logger;
        private IWorldRepository _repository;

        public TripPlannerController(IWorldRepository repository,
            ILogger<TripPlannerController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        public IActionResult TripPlanner()
        {
            try
            {
                var data = _repository.GetAllTrips();
                return View(data);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get trips in TripPlanner page: {ex.Message}");
                return Redirect("/error");
            }

        }
    }
}
