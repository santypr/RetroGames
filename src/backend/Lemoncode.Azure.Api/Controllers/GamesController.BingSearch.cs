using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Search.WebSearch.Models;

namespace Lemoncode.Azure.Api.Controllers
{
    public partial class GamesController : ControllerBase
    {
        [HttpGet("Search")]
        [ProducesResponseType(typeof(SearchResponse), 200)]
        public async Task<IActionResult> SearchVideoGame([FromQuery] string searchTerm)
        {
            log.LogInformation($"GAMES - Getting Game Information in Bing Search");

            try
            {
                var searchResult = await bingSearchService.SearchAsync(searchTerm);
                return Ok(searchResult);

            }
            catch (Exception ex)
            {
                log.LogError($"GAMES - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }       
    }
}
