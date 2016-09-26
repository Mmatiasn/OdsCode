using Microsoft.AspNetCore.Mvc;

namespace OdsCode.Controllers.Web
{
    public class HomeController : Controller
    {
        public IActionResult Home()
        {
            return View();
        }
    }
}
