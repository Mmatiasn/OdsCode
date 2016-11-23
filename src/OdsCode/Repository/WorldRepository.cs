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

        public IEnumerable<PlayList> GetAllPlayLists(string userName)
        {
            _logger.LogInformation("Getting All Trips from the Database");
            return _context.PlayLists
                .Include(t => t.Videos)
                .Where(t => t.UserName == userName)
                .ToList();
        }

        public PlayList GetAPlayList(string userName, int playListId)
        {
            try
            {
                return _context.PlayLists
                    .Include(t => t.Videos)
                    .Where(t => t.Id == playListId && t.UserName == userName)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public PlayList DeleteAPlayList(string userName, int playListId)
        {
            try
            {
                var playlist = _context.PlayLists
                   .Include(t => t.Videos)
                   .Where(t => t.Id == playListId && t.UserName == userName)
                   .First();

                _context.PlayLists.Remove(playlist);

                return playlist;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public Video SaveVideoChanges(string userName, int playListId, Video videoChanges)
        {
            var playList = GetAPlayList(userName, playListId);

            if (playList.Videos != null)
            {
                playList.Videos.YtVideoString = videoChanges.YtVideoString;
                _context.Update(playList);
                return videoChanges;
            }
            return videoChanges;
        }

        public void AddAPlayList(string userName, PlayList newPlayList)
        {
            _context.Add(newPlayList);
        }
    }
}
