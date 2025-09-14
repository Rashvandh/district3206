import { useState, useEffect } from "react";
import { Search, Filter, Download, Share2, Eye, Calendar, Camera, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  uploadDate: string;
  event: string;
  year: number;
  photographer?: string;
  tags: string[];
  views: number;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockGalleryItems: GalleryItem[] = [
        {
          id: "1",
          title: "Community Blood Drive Success",
          description: "Amazing turnout at our quarterly blood drive event",
          type: "image",
          url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
          uploadDate: "2024-01-15T10:00:00Z",
          event: "Blood Drive",
          year: 2024,
          photographer: "Sarah Johnson",
          tags: ["community-service", "blood-drive", "healthcare"],
          views: 156
        },
        {
          id: "2",
          title: "Leadership Workshop Highlights",
          description: "Key moments from our professional development session",
          type: "image",
          url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
          uploadDate: "2024-01-22T15:30:00Z",
          event: "Leadership Workshop",
          year: 2024,
          photographer: "Michael Chen",
          tags: ["leadership", "training", "professional-development"],
          views: 89
        },
        {
          id: "3",
          title: "Environmental Cleanup Team",
          description: "Rotaractors working together to clean our local environment",
          type: "image",
          url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
          uploadDate: "2024-01-28T09:15:00Z",
          event: "Environmental Cleanup",
          year: 2024,
          photographer: "Emma Rodriguez",
          tags: ["environment", "cleanup", "teamwork"],
          views: 134
        },
        {
          id: "4",
          title: "Youth Career Fair 2024",
          description: "Students exploring career opportunities",
          type: "image",
          url: "https://images.unsplash.com/photo-1515169067868-5387ec398bb8?w=800&h=600&fit=crop",
          uploadDate: "2024-02-05T12:00:00Z",
          event: "Career Fair",
          year: 2024,
          photographer: "David Thompson",
          tags: ["youth", "career", "education"],
          views: 203
        },
        {
          id: "5",
          title: "District Conference Opening",
          description: "Inspiring opening ceremony of our annual district conference",
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
          uploadDate: "2023-11-10T08:00:00Z",
          event: "District Conference",
          year: 2023,
          photographer: "Lisa Wang",
          tags: ["conference", "ceremony", "district"],
          views: 445
        },
        {
          id: "6",
          title: "Holiday Charity Drive",
          description: "Spreading joy during the holiday season",
          type: "image",
          url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
          uploadDate: "2023-12-15T14:20:00Z",
          event: "Holiday Charity",
          year: 2023,
          photographer: "James Park",
          tags: ["charity", "holiday", "gifts", "community"],
          views: 321
        },
        {
          id: "7",
          title: "International Understanding Week",
          description: "Celebrating diversity and cultural exchange",
          type: "image",
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
          uploadDate: "2023-10-20T16:45:00Z",
          event: "Cultural Exchange",
          year: 2023,
          photographer: "Sarah Johnson",
          tags: ["international", "culture", "diversity"],
          views: 167
        },
        {
          id: "8",
          title: "New Member Induction Ceremony",
          description: "Welcoming new members to our Rotaract family",
          type: "image",
          url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
          uploadDate: "2023-09-15T19:00:00Z",
          event: "Member Induction",
          year: 2023,
          photographer: "Michael Chen",
          tags: ["induction", "new-members", "ceremony"],
          views: 98
        }
      ];
      setGalleryItems(mockGalleryItems);
      setFilteredItems(mockGalleryItems);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter gallery items
  useEffect(() => {
    let filtered = galleryItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter(item => item.year.toString() === selectedYear);
    }

    if (selectedEvent !== "all") {
      filtered = filtered.filter(item => item.event === selectedEvent);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    setFilteredItems(filtered);
  }, [galleryItems, searchTerm, selectedYear, selectedEvent, selectedType]);

  const events = [...new Set(galleryItems.map(item => item.event))];
  const years = [...new Set(galleryItems.map(item => item.year))].sort((a, b) => b - a);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    // Increment view count (in real app, this would be an API call)
    setGalleryItems(prev =>
      prev.map(i => i.id === item.id ? { ...i, views: i.views + 1 } : i)
    );
  };

  const downloadItem = (item: GalleryItem) => {
    // Implement download logic
    console.log("Downloading:", item.title);
  };

  const shareItem = (item: GalleryItem) => {
    // Implement share logic
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href + `?item=${item.id}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href + `?item=${item.id}`);
    }
  };

  const GalleryItemCard = ({ item }: { item: GalleryItem }) => (
    <Card className="glass-card hover-lift group cursor-pointer overflow-hidden">
      <div className="relative" onClick={() => openLightbox(item)}>
        <div className="aspect-square overflow-hidden">
          <img
            src={item.type === "video" ? item.thumbnail : item.url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Type indicator */}
        <div className="absolute top-2 right-2">
          {item.type === "video" ? (
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-2">
              <Play className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div className="bg-black/70 backdrop-blur-sm rounded-full p-2">
              <Camera className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Views indicator */}
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Eye className="h-3 w-3 text-white" />
            <span className="text-xs text-white">{item.views}</span>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="secondary">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{item.event}</Badge>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                shareItem(item);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                downloadItem(item);
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
          <span>by {item.photographer}</span>
        </div>
      </CardContent>
    </Card>
  );

  const getItemsByType = (type: string) => {
    if (type === "images") return filteredItems.filter(item => item.type === "image");
    if (type === "videos") return filteredItems.filter(item => item.type === "video");
    return filteredItems;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Gallery</h1>
              <p className="text-muted-foreground">
                Explore photos and videos from our events and activities
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-card"
                />
              </div>
            </div>
            
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event} value={event}>{event}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{galleryItems.length}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {galleryItems.filter(item => item.type === "image").length}
              </div>
              <div className="text-sm text-muted-foreground">Photos</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {galleryItems.filter(item => item.type === "video").length}
              </div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="all">
              All ({getItemsByType("all").length})
            </TabsTrigger>
            <TabsTrigger value="images">
              Photos ({getItemsByType("images").length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos ({getItemsByType("videos").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="glass-card animate-pulse">
                    <div className="aspect-square bg-muted"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getItemsByType("all").map(item => (
                  <GalleryItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getItemsByType("images").map(item => (
                <GalleryItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getItemsByType("videos").map(item => (
                <GalleryItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No items found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl glass-card p-0">
            {selectedItem && (
              <>
                <div className="relative">
                  {selectedItem.type === "image" ? (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="w-full max-h-[70vh] object-contain"
                    />
                  ) : (
                    <video
                      src={selectedItem.url}
                      controls
                      className="w-full max-h-[70vh]"
                      poster={selectedItem.thumbnail}
                    />
                  )}
                </div>
                
                <div className="p-6">
                  <DialogHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{selectedItem.event}</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => shareItem(selectedItem)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadItem(selectedItem)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <DialogTitle className="text-2xl font-heading">
                      {selectedItem.title}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedItem.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(selectedItem.uploadDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Camera className="mr-2 h-4 w-4" />
                        {selectedItem.photographer}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="mr-2 h-4 w-4" />
                        {selectedItem.views} views
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Gallery;