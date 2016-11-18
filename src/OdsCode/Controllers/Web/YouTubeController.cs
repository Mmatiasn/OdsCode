using Microsoft.AspNetCore.Mvc;
using System;

namespace OdsCode.Controllers.Web
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class YouTubeController : Controller
    {
        public IActionResult YouTube()
        {
            return View();
        }

        public IActionResult All()
        {
            return View();
        }
    }
}
