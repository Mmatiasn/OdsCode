using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace OdsCode.Models
{
    public class Video
    {
        [Key, Required, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PlayListId { get; set; }
        public string YtVideoString { get; set; }
        public bool? Replay { get; set; }
        public bool? Shuffle { get; set; }
        public bool? Autoplay { get; set; }
        [NotMapped]
        public JArray YtPlayListInfo { get; set; }
    }
}
