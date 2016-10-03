using System.Collections.Generic;
using OdsCode.Models;
using System.Threading.Tasks;

namespace OdsCode.Repository
{
    public interface IWorldRepository
    {
        Trip GetTripByName(string tripName);
        void AddTrip(Trip trip);
        void AddStop(string tripName, Stop newStop);
        IEnumerable<Trip> GetAllTrips();
        IEnumerable<Trip> GetUserTripWithStops(string name, string tripName);
        IEnumerable<Trip> GetUserTripsWithStops(string name);
        Task<bool> SaveChangesAsync();
        Task<bool> SaveAll();
    }
}