using Microsoft.AspNetCore.Mvc;

namespace alahly.clients.mvc;

public class SectionVideoPlayList : ViewComponent
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
