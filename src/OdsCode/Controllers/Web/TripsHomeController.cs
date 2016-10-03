using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Repository;
using System;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers.Web
{
    public class TripsHomeController : Controller
    {
        private ILogger<TripsHomeController> _logger;
        private IWorldRepository _repository;

        public TripsHomeController(IWorldRepository repository,
            ILogger<TripsHomeController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        public IActionResult TripsHome()
        {
            return View();
        }

        [Authorize]
        public IActionResult Trips()
        {
                return View();
        }
    }
}
