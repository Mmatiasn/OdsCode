using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OdsCode.Repository;
using System;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OdsCode.Controllers.Web
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
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
        public IActionResult Trips()
        {
            return View();
        }

        [Authorize]
        public IActionResult All()
        {
                return View();
        }
    }
}
