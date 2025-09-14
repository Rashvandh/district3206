import { useState, useEffect } from "react";
import { Bell, Megaphone, Clock, AlertCircle, Pin, Plus, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  isPinned: boolean;
  isRead: boolean;
  tags: string[];
  attachments?: string[];
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockAnnouncements: Announcement[] = [
        {
          id: "1",
          title: "District Conference 2024 Registration Now Open",
          content: "We're excited to announce that registration is now open for the Annual District Conference 2024! This year's theme is 'Innovation in Service' and will feature keynote speakers, workshops, and networking opportunities. Early bird registration ends March 15th with special discounts for all members. The conference will be held at the Grand Convention Center from April 20-22, 2024. Don't miss this opportunity to connect with fellow Rotaractors and learn from industry leaders.",
          author: "District Governor Sarah Johnson",
          publishDate: "2024-01-10T08:00:00Z",
          category: "District Events",
          priority: "high",
          isPinned: true,
          isRead: false,
          tags: ["conference", "registration", "district"]
        },
        {
          id: "2",
          title: "Urgent: Blood Drive Volunteers Needed",
          content: "Our upcoming Community Blood Drive on January 15th is in urgent need of volunteers. We need 20 additional volunteers to help with registration, donor assistance, and refreshments. This is a critical community service project that can save lives. Please contact your club president if you can volunteer for any shift between 9 AM and 4 PM.",
          author: "Community Service Chair Michael Chen",
          publishDate: "2024-01-08T10:30:00Z",
          category: "Community Service",
          priority: "urgent",
          isPinned: true,
          isRead: false,
          tags: ["volunteers", "blood-drive", "urgent", "community-service"]
        },
        {
          id: "3",
          title: "New Member Orientation Schedule",
          content: "Welcome to all our new members! We have scheduled orientation sessions for January to help you get started with Rotaract. Sessions will cover our history, current projects, leadership opportunities, and how to get involved. Sessions are scheduled for January 18th at 7 PM (virtual) and January 25th at 6 PM (in-person at District Office).",
          author: "Membership Director Emma Rodriguez",
          publishDate: "2024-01-05T14:15:00Z",
          category: "Membership",
          priority: "medium",
          isPinned: false,
          isRead: true,
          tags: ["new-members", "orientation", "training"]
        },
        {
          id: "4",
          title: "Grant Application Deadline Extended",
          content: "Good news! The deadline for District Grant applications has been extended to January 31st, 2024. This gives clubs additional time to prepare their community service project proposals. Grants up to $2,500 are available for qualifying projects. Please review the updated guidelines and submit your applications through the district portal.",
          author: "District Treasurer David Thompson",
          publishDate: "2024-01-03T16:45:00Z",
          category: "Grants & Funding",
          priority: "medium",
          isPinned: false,
          isRead: true,
          tags: ["grants", "funding", "deadline", "projects"]
        },
        {
          id: "5",
          title: "Environmental Project Success Story",
          content: "Congratulations to Riverside Rotaract Club for their outstanding environmental cleanup project! They successfully removed over 500 pounds of waste from the riverbank and planted 100 native trees. This project has been recognized by the city council and will serve as a model for other clubs. Great work team!",
          author: "Environmental Chair Lisa Wang",
          publishDate: "2024-01-01T09:00:00Z",
          category: "Project Updates",
          priority: "low",
          isPinned: false,
          isRead: true,
          tags: ["environment", "success-story", "recognition"]
        }
      ];
      setAnnouncements(mockAnnouncements);
      setFilteredAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter announcements
  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(announcement => announcement.category === selectedCategory);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter(announcement => announcement.priority === selectedPriority);
    }

    setFilteredAnnouncements(filtered);
  }, [announcements, searchTerm, selectedCategory, selectedPriority]);

  const categories = [...new Set(announcements.map(a => a.category))];
  const priorities = ["urgent", "high", "medium", "low"];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <AlertCircle className="h-4 w-4" />;
      case "medium":
        return <Bell className="h-4 w-4" />;
      case "low":
        return <Megaphone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const markAsRead = (id: string) => {
    setAnnouncements(prev =>
      prev.map(announcement =>
        announcement.id === id ? { ...announcement, isRead: true } : announcement
      )
    );
  };

  const getAnnouncementsByType = (type: "pinned" | "unread" | "all") => {
    switch (type) {
      case "pinned":
        return filteredAnnouncements.filter(a => a.isPinned);
      case "unread":
        return filteredAnnouncements.filter(a => !a.isRead);
      case "all":
      default:
        return filteredAnnouncements;
    }
  };

  const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
    const isExpanded = expandedCards.has(announcement.id);
    const previewContent = announcement.content.substring(0, 150) + "...";

    return (
      <Card 
        className={`glass-card hover-lift transition-all duration-300 ${
          !announcement.isRead ? "border-l-4 border-l-primary" : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {announcement.isPinned && (
                  <Pin className="h-4 w-4 text-primary" />
                )}
                <Badge className={getPriorityColor(announcement.priority)} variant="secondary">
                  {getPriorityIcon(announcement.priority)}
                  <span className="ml-1 capitalize">{announcement.priority}</span>
                </Badge>
                <Badge variant="outline">{announcement.category}</Badge>
              </div>
              <CardTitle className={`text-lg leading-tight ${!announcement.isRead ? "font-bold" : ""}`}>
                {announcement.title}
              </CardTitle>
              <CardDescription className="mt-1">
                By {announcement.author} • {new Date(announcement.publishDate).toLocaleDateString()}
              </CardDescription>
            </div>
            {!announcement.isRead && (
              <div className="w-3 h-3 bg-primary rounded-full ml-3 mt-1" />
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(announcement.id)}>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {isExpanded ? announcement.content : previewContent}
              </p>
              
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto text-primary hover:text-primary-hover"
                  onClick={() => !announcement.isRead && markAsRead(announcement.id)}
                >
                  {isExpanded ? "Show less" : "Read more"}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-3">
                {announcement.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {announcement.attachments && announcement.attachments.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium mb-2">Attachments:</p>
                    <div className="space-y-1">
                      {announcement.attachments.map((attachment, index) => (
                        <Button key={index} variant="ghost" size="sm" className="h-auto p-2 justify-start">
                          📎 {attachment}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Announcements</h1>
              <p className="text-muted-foreground">
                Stay updated with the latest district news and updates
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search announcements, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-card"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] glass-card">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-full md:w-[150px] glass-card">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority} className="capitalize">
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Announcement Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="pinned">
              Pinned ({getAnnouncementsByType("pinned").length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({getAnnouncementsByType("unread").length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({getAnnouncementsByType("all").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pinned" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="glass-card animate-pulse">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {getAnnouncementsByType("pinned").map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <div className="space-y-4">
              {getAnnouncementsByType("unread").map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {getAnnouncementsByType("all").map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {!loading && filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No announcements found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;