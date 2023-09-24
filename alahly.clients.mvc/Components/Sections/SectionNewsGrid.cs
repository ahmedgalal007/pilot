using Microsoft.AspNetCore.Mvc;

namespace alahly.clients.mvc;

public class SectionNewsGrid : ViewComponent
{
    // public IViewComponentResult Invoke()
    // {
    //     return View();
    // }
    public async Task<IViewComponentResult> InvokeAsync()
    {
        return View();
    }
}
