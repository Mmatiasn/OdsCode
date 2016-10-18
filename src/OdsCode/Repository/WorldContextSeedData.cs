

using OdsCode.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OdsCode.Repository
{
	public class WorldContextSeedData
    {
        private WorldContext _context;
        private UserManager<WorldUser> _userManager;

        public WorldContextSeedData(WorldContext context,
            UserManager<WorldUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

		public async Task EnsureSeedData()
        {
            if (await _userManager.FindByEmailAsync("admin@odscode.com") == null)
            {
                var user = new WorldUser
                {
                    UserName = "admin",
                    Email = "admin@odscode.com"
                };

                await _userManager.CreateAsync(user, "password");
            }

			if (!_context.Trips.Any())
            {
                var usTrip = new Trip()
                {
                    DateCreated = DateTime.UtcNow,
                    Name = "US Trip",
                    UserName = "admin", //TODO Add UserName
                    Stops = new List<Stop>()
                    {
						new Stop() {  Name = "Atlanta, GA", StopDate = new DateTime(2014, 6, 4)},
						new Stop() {  Name = "New York, NY", StopDate = new DateTime(2014, 6, 9)},
						new Stop() {  Name = "Boston, MA", StopDate = new DateTime(2014, 7, 1)},
						new Stop() {  Name = "Chicago, IL", StopDate = new DateTime(2014, 7, 10)},
						new Stop() {  Name = "Seattle, WA", StopDate = new DateTime(2014, 8, 13)},
						new Stop() {  Name = "Atlanta, GA", StopDate = new DateTime(2014, 8, 23)},

                    }
                };

                _context.Trips.Add(usTrip);

                _context.Stops.AddRange(usTrip.Stops);

                var worldTrip = new Trip()
                {
                    DateCreated = DateTime.UtcNow,
                    Name = "WorldTrip",
                    UserName = "admin", //TODO Add UserName
                    Stops = new List<Stop>()
                    {
						new Stop() { Name = "Atlanta, Georgia", StopDate = DateTime.Parse("Jun 3, 2014") },
						new Stop() { Name = "Paris, France", StopDate = DateTime.Parse("Jun 4, 2014") },
						new Stop() { Name = "Brussels, Belgium", StopDate = DateTime.Parse("Jun 25, 2014") },
						new Stop() { Name = "Bruges, Belgium", StopDate = DateTime.Parse("Jun 28, 2014") },
						new Stop() { Name = "Paris, France", StopDate = DateTime.Parse("Jun 30, 2014") },
						new Stop() { Name = "London, UK", StopDate = DateTime.Parse("Jul 8, 2014") },
						new Stop() { Name = "Bristol, UK", StopDate = DateTime.Parse("Jul 24, 2014") },
						new Stop() { Name = "Stretton Sugwas, UK", StopDate = DateTime.Parse("Jul 29, 2014") },
						new Stop() { Name = "Gloucestershire, UK", StopDate = DateTime.Parse("Jul 30, 2014") },
						new Stop() { Name = "Nottingham, UK", StopDate = DateTime.Parse("Jul 31, 2014") },
						new Stop() { Name = "London, UK", StopDate = DateTime.Parse("Aug 1, 2014") },
						new Stop() { Name = "Edinburgh, UK", StopDate = DateTime.Parse("Aug 5, 2014") },
						new Stop() { Name = "Glasgow, UK", StopDate = DateTime.Parse("Aug 6, 2014") },
						new Stop() { Name = "Aberdeen, UK", StopDate = DateTime.Parse("Aug 7, 2014") },
						new Stop() { Name = "Edinburgh, UK", StopDate = DateTime.Parse("Aug 8, 2014") },
						new Stop() { Name = "London, UK", StopDate = DateTime.Parse("Aug 10, 2014") },
						new Stop() { Name = "Amsterdam, Netherlands", StopDate = DateTime.Parse("Aug 14, 2014") },
						new Stop() { Name = "Strasbourg, France", StopDate = DateTime.Parse("Aug 17, 2014") },
						new Stop() { Name = "Lausanne, Switzerland", StopDate = DateTime.Parse("Aug 19, 2014") },
						new Stop() { Name = "Zermatt, Switzerland", StopDate = DateTime.Parse("Aug 27, 2014") },
						new Stop() { Name = "Lausanne, Switzerland", StopDate = DateTime.Parse("Aug 29, 2014") },
						new Stop() { Name = "Dublin, Ireland", StopDate = DateTime.Parse("Sep 2, 2014") },
						new Stop() { Name = "Belfast, Northern Ireland", StopDate = DateTime.Parse("Sep 7, 2014") },
						new Stop() { Name = "Dublin, Ireland", StopDate = DateTime.Parse("Sep 9, 2014") },
						new Stop() { Name = "Zurich, Switzerland", StopDate = DateTime.Parse("Sep 16, 2014") },
						new Stop() { Name = "Munich, Germany", StopDate = DateTime.Parse("Sep 19, 2014") },
						new Stop() { Name = "Prague, Czech Republic", StopDate = DateTime.Parse("Sep 21, 2014") },
						new Stop() { Name = "Dresden, Germany", StopDate = DateTime.Parse("Oct 1, 2014") },
						new Stop() { Name = "Prague, Czech Republic", StopDate = DateTime.Parse("Oct 4, 2014") },
						new Stop() { Name = "Dubrovnik, Croatia", StopDate = DateTime.Parse("Oct 10, 2014") },
						new Stop() { Name = "Sofia, Bulgaria", StopDate = DateTime.Parse("Oct 16, 2014") },
						new Stop() { Name = "Brosov, Romania", StopDate = DateTime.Parse("Oct 20, 2014") },
						new Stop() { Name = "Istanbul, Turkey", StopDate = DateTime.Parse("Nov 1, 2014") },
						new Stop() { Name = "Zagreb, Croatia", StopDate = DateTime.Parse("Nov 11, 2014") },
						new Stop() { Name = "Istanbul, Turkey", StopDate = DateTime.Parse("Nov 15, 2014") },
						new Stop() { Name = "Brussels, Belgium", StopDate = DateTime.Parse("Nov 25, 2014") },
						new Stop() { Name = "Cologne, Germany", StopDate = DateTime.Parse("Nov 30, 2014") },
						new Stop() { Name = "Vienna, Austria", StopDate = DateTime.Parse("Dec 4, 2014") },
						new Stop() { Name = "Budapest, Hungary", StopDate = DateTime.Parse("Dec 28,2014") },
						new Stop() { Name = "Athens, Greece", StopDate = DateTime.Parse("Jan 2, 2015") },
						new Stop() { Name = "Pretoria, South Africa", StopDate = DateTime.Parse("Jan 19, 2015") },
						new Stop() { Name = "Florence, Italy", StopDate = DateTime.Parse("Feb 1, 2015") },
						new Stop() { Name = "Venice, Italy", StopDate = DateTime.Parse("Feb 9, 2015") },
						new Stop() { Name = "Florence, Italy", StopDate = DateTime.Parse("Feb 13, 2015") },
						new Stop() { Name = "Rome, Italy", StopDate = DateTime.Parse("Feb 17, 2015") },
						new Stop() { Name = "New Delhi, India", StopDate = DateTime.Parse("Mar 4, 2015") },
						new Stop() { Name = "Kathmandu, Nepal", StopDate = DateTime.Parse("Mar 10, 2015") },
						new Stop() { Name = "New Delhi, India", StopDate = DateTime.Parse("Mar 11, 2015") },
						new Stop() { Name = "Macau", StopDate = DateTime.Parse("Mar 21, 2015") },
						new Stop() { Name = "Hong Kong", StopDate = DateTime.Parse("Mar 24, 2015") },
						new Stop() { Name = "Beijing, China", StopDate = DateTime.Parse("Apr 19, 2015") },
						new Stop() { Name = "Hong Kong", StopDate = DateTime.Parse("Apr 24, 2015") },
						new Stop() { Name = "Singapore", StopDate = DateTime.Parse("Apr 30, 2015") },
						new Stop() { Name = "Kuala Lumpor, Malaysia", StopDate = DateTime.Parse("May 7, 2015") },
						new Stop() { Name = "Bangkok, Thailand", StopDate = DateTime.Parse("May 24, 2015") },
						new Stop() { Name = "Atlanta, Georgia", StopDate = DateTime.Parse("Jun 17, 2015") },
                    }
                };

                _context.Trips.Add(worldTrip);

                _context.Stops.AddRange(worldTrip.Stops);

                await _context.SaveChangesAsync();
            }
        }
    }
}