using System.Collections.Generic;
using OdsCode.Models;
using System.Threading.Tasks;

namespace OdsCode.Repository
{
    public interface IWorldRepository
    {
        Trip GetTripByName(int tripId);
        void AddTrip(Trip trip);
        void AddStop(int tripId, Stop newStop);
        Stop DeleteUserTripStop(int tripId, int stopId, string name);
        IEnumerable<Trip> GetAllTrips();
        Trip DeleteUserTripWithStops(int tripId, string name);
        Trip GetUserTripWithStops(int tripId, string name);
        IEnumerable<Trip> GetUserTripsWithStops(string name);
        Task<bool> SaveChangesAsync();
        Task<bool> SaveAll();
    }
}