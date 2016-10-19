using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace OdsCode.Services
{
    public class YouTubeSearchService
    {
        private IConfigurationRoot _config;
        private ILogger<YouTubeSearchService> _logger;

        public YouTubeSearchService(ILogger<YouTubeSearchService> logger,
            IConfigurationRoot config)
        {
            _logger = logger;
            _config = config;
        }

        public async Task<YouTubeSearchResult> SearchYouTubeAsync(string query)
        {
            var result = new YouTubeSearchResult();
            var errorMessage = "";
            try
            {
                string encodedName = WebUtility.UrlEncode(query);
                Uri url = new Uri($"http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q={encodedName}");
                HttpClient client = new HttpClient();
                Stream streamResult = await client.GetStreamAsync(url);
                StreamReader reader = new StreamReader(streamResult);
               
                errorMessage = reader.ReadToEnd();
                JObject jsonResults = JObject.Parse(reader.ReadToEnd());

                result.Success = true;
                result.Message = "Success getting search results";
                result.SearchResults = jsonResults;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = $"Server error getting search results: {errorMessage} | {ex}";
                result.SearchResults = null;
            }

            return result;

        }
    }
}
