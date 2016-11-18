using Microsoft.AspNetCore.Mvc;

namespace OdsCode.Controllers.Web
{
    public class HomeController : Controller
    {
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Home()
        {
            return View();
        }
    }
}
