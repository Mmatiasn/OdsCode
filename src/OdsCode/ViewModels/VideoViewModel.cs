using System;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class VideoViewModel
    {
        [Required]
        public int PlayListId { get; set; }
        public string YtVideoString { get; set; }
        public bool? Replay { get; set; }
        public bool? Shuffle { get; set; }
        public bool? Autoplay { get; set; }
    }
}
