using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace YouTubeDll
{
	public class YouTubeVideoSearchService
	{
        private string _youTubeApiKey;

        public YouTubeVideoSearchService(string youTubeApiKey)
        {
            _youTubeApiKey = youTubeApiKey;
        }

        public async Task<YouTubeVideoSearchResult> SearchYouTubeAsync(string query)
        {
            var result = new YouTubeVideoSearchResult()
            {
                Success = false,
                Message = "Failed to get results"
            };

            var encodedQuery = WebUtility.UrlEncode(query);
            var youTubeApiKey = WebUtility.UrlEncode(_youTubeApiKey);
            var limitedSearch = new Uri($"https://www.googleapis.com/youtube/v3/search?q={encodedQuery}&type=video&maxResults=3&part=snippet&key={youTubeApiKey}");
            List<string> videoIdList = new List<string>();

            var client = new HttpClient();

            var limitedSearchResponse = JObject.Parse(await client.GetStringAsync(limitedSearch));

            var videoListArray = (limitedSearchResponse["items"]);

            if (!videoListArray.HasValues)
            {
                result.Message = $"Could not find '{query}' videos";
                client.Dispose();
            }
            else
            {
                foreach (var item in videoListArray)
                {
                    videoIdList.Add((item["id"])["videoId"].Value<string>());
                }
                var videoIdsString = string.Join(",", videoIdList);
                var detailedSearch =
                    new Uri(
                        $"https://www.googleapis.com/youtube/v3/videos?id={videoIdsString}&part=snippet,contentDetails,statistics,status&key={youTubeApiKey}");
                var videoJsonResponse =
                    (JObject.Parse(await client.GetStringAsync(detailedSearch))["items"].Value<JArray>());
                result.SearchResults = videoJsonResponse;
                result.Message = "";
                result.Success = true;
                result.PageToken = limitedSearchResponse["nextPageToken"].Value<string>();
                client.Dispose();
            }

            return result;

        }

        public async Task<YouTubeVideoSearchResult> SearchYouTubeAsync(string query, string pageToken)
        {
            var result = new YouTubeVideoSearchResult()
            {
                Success = false,
                Message = "Failed to get results"
            };

            var encodedQuery = WebUtility.UrlEncode(query);
            var encodedPageToken = WebUtility.UrlEncode(pageToken);
            var youTubeApiKey = WebUtility.UrlEncode(_youTubeApiKey);
            var limitedSearch =
                new Uri($"https://www.googleapis.com/youtube/v3/search?q={encodedQuery}&maxResults=3&type=video&part=snippet&pageToken={encodedPageToken}&key={youTubeApiKey}");
            List<string> videoIdList = new List<string>();
            HttpClient client = new HttpClient();

            var limitedSearchResponse = JObject.Parse(await client.GetStringAsync(limitedSearch));

            var videoListArray = (limitedSearchResponse["items"]);

            if (!videoListArray.HasValues)
            {
                result.Message = $"Could not find '{query}' videos";
                client.Dispose();
            }
            else
            {
                foreach (var item in videoListArray)
                {
                    string id = "";
                    try
                    {
                        id = (item["id"])["videoId"].Value<string>();
                    }
                    catch (Exception)
                    {
                        id = null;
                    }
                    finally
                    {
                        if (id != null)
                        {
                            videoIdList.Add((item["id"])["videoId"].Value<string>());
                        }
                    }

                }
                string videoIdsString = string.Join(",", videoIdList);
                var detailedSearch = new Uri($"https://www.googleapis.com/youtube/v3/videos?id={videoIdsString}&part=snippet,contentDetails,statistics,status&key={youTubeApiKey}");

                var videoJsonResponse = (JObject.Parse(await client.GetStringAsync(detailedSearch))["items"].Value<JArray>());
                result.SearchResults = videoJsonResponse;
                result.Message = "";
                result.Success = true;
                result.PageToken = limitedSearchResponse["nextPageToken"].Value<string>();
                client.Dispose();
            }
            return result;
        }

        public async Task<YouTubeVideoSearchResult> GetYouTubeByIdsAsync(string query)
        {
            var result = new YouTubeVideoSearchResult()
            {
                Success = false,
                Message = "Failed to get results"
            };

            var encodedQuery = WebUtility.UrlEncode(query);
            var youTubeApiKey = WebUtility.UrlEncode(_youTubeApiKey);

            HttpClient client = new HttpClient();

            var detailedSearch = new Uri($"https://www.googleapis.com/youtube/v3/videos?id={encodedQuery}&part=snippet,contentDetails,statistics,status&key={youTubeApiKey}");
            var videoJsonResponse = (JObject.Parse(await client.GetStringAsync(detailedSearch))["items"].Value<JArray>());

            result.SearchResults = videoJsonResponse;
            result.Message = "";
            result.Success = true;
            client.Dispose();
            return result;
        }
    }
}


