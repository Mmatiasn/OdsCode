using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OdsCode.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace OdsCode.Repository
{
    public class WorldRepository : IWorldRepository
    {
        private WorldContext _context;
        private ILogger<WorldRepository> _logger;

        public WorldRepository(WorldContext context,
            ILogger<WorldRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddTrip(Trip trip)
        {
            _context.Add(trip);
        }

        public void AddPlayList(PlayList playList)
        {
            _context.Add(playList);
        }

        public Trip GetTripById(int tripId, string userName)
        {
            return _context.Trips
                .Include(t => t.Stops)
                .Where(t => t.Id == tripId && t.UserName == userName)
                .FirstOrDefault();
        }

        public IEnumerable<Trip> GetAllTrips(string userName)
        {
            _logger.LogInformation("Getting All Trips from the Database");
            return _context.Trips
                .Include(t => t.Stops)
                .Where(t => t.UserName == userName)
                .ToList();
        }

        public IEnumerable<PlayList> GetAllPlayLists(string userName)
        {
            _logger.LogInformation("Getting All Play-list from the Database");
            return _context.PlayLists
                .Include(t => t.Videos)
                .Where(t => t.UserName == userName)
                .ToList();
        }

        public Trip GetUserTripWithStops(int tripId, string userName)
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == userName && t.Id == tripId)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public PlayList GetUserPlayListWithVideos(int playListsId, string userName)
        {
            try
            {
                return _context.PlayLists
                    .Include(t => t.Videos)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == userName && t.Id == playListsId)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public Trip DeleteUserTripWithStops(int tripId, string userName)
        {
            try
            {
                Trip trip = _context.Trips
                    .Include(t => t.Stops)
                    .Where(t => t.UserName == userName && t.Id == tripId)
                    .First();
                _context.Stops.RemoveRange(trip.Stops);
                _context.Trips.Remove(trip);

                return trip;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public PlayList DeleteUserPlayListWithVideos(int playListId, string userName)
        {
            try
            {
                PlayList playlist = _context.PlayLists
                    .Include(t => t.Videos)
                    .Where(t => t.UserName == userName && t.Id == playListId)
                    .First();
                _context.Videos.RemoveRange(playlist.Videos);
                _context.PlayLists.Remove(playlist);

                return playlist;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public Stop DeleteUserTripStop(int tripId, int stopId, string userName)
        {
            try
            {
                 var trip = _context.Trips
                    .Include(t => t.Stops)
                    .Where(t => t.Id == tripId && t.UserName == userName)
                    .First();

                var stop = trip.Stops
                    .Where(s => s.Id == stopId)
                    .First();

                _context.Stops.Remove(stop);

                return stop;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public Video DeleteUserPlayListVideo(int playListId, int videId, string userName)
        {
            try
            {
                var playlist = _context.PlayLists
                   .Include(t => t.Videos)
                   .Where(t => t.Id == playListId && t.UserName == userName)
                   .First();

                var video = playlist.Videos
                    .Where(s => s.Id == videId)
                    .First();

                _context.Videos.Remove(video);

                return video;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not delete video in play-list from database", ex);
                return null;
            }
        }

        public IEnumerable<Trip> GetUserTripsWithStops(string name)
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == name)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public void AddStop(int tripId, string userName, Stop newStop)
        {
            var trip = GetTripById(tripId, userName);

            if (trip != null)
            {
                trip.Stops.Add(newStop);
                _context.Stops.Add(newStop);
            }
        }

        public async Task<bool> SaveAll()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
