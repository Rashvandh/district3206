import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: string;
  status: "upcoming" | "ongoing" | "completed";
  attendees: number;
  maxAttendees?: number;
  image?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Community Blood Drive",
          description: "Help save lives by donating blood at our quarterly community blood drive. All blood types needed.",
          date: "2024-01-15",
          time: "09:00 AM - 04:00 PM",
          venue: "Central Community Center",
          organizer: "Metro Rotaract Club",
          category: "Community Service",
          status: "upcoming",
          attendees: 45,
          maxAttendees: 100
        },
        {
          id: "2",
          title: "Leadership Development Workshop",
          description: "Enhance your leadership skills with interactive sessions led by industry experts.",
          date: "2024-01-22",
          time: "02:00 PM - 06:00 PM",
          venue: "District Conference Center",
          organizer: "District Leadership Team",
          category: "Professional Development",
          status: "upcoming",
          attendees: 78,
          maxAttendees: 80
        },
        {
          id: "3",
          title: "Environmental Cleanup Campaign",
          description: "Join us in cleaning up local parks and waterways to protect our environment.",
          date: "2024-01-28",
          time: "08:00 AM - 12:00 PM",
          venue: "Riverside Park",
          organizer: "Green Earth Rotaract",
          category: "Environmental",
          status: "upcoming",
          attendees: 32,
          maxAttendees: 60
        },
        {
          id: "4",
          title: "Youth Career Fair",
          description: "Connect with potential employers and explore career opportunities in various fields.",
          date: "2024-02-05",
          time: "10:00 AM - 04:00 PM",
          venue: "University Auditorium",
          organizer: "Career Development Committee",
          category: "Youth Development",
          status: "upcoming",
          attendees: 156,
          maxAttendees: 200
        },
        {
          id: "5",
          title: "Holiday Charity Drive",
          description: "Successful charity drive that collected over 1000 gifts for underprivileged children.",
          date: "2023-12-15",
          time: "10:00 AM - 06:00 PM",
          venue: "Multiple Locations",
          organizer: "District 3206",
          category: "Community Service",
          status: "completed",
          attendees: 200
        }
      ];
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search and category
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory]);

  const categories = [
    "Community Service",
    "Professional Development", 
    "Environmental",
    "Youth Development",
    "Cultural",
    "Fundraising"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500";
      case "ongoing": return "bg-green-500";
      case "completed": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  };

  const handleRegister = (eventId: string) => {
    // Implement registration logic
    console.log("Registering for event:", eventId);
  };

  const getEventsByStatus = (status: string) => {
    return filteredEvents.filter(event => event.status === status);
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="glass-card hover-lift group cursor-pointer" onClick={() => setSelectedEvent(event)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary">{event.category}</Badge>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
        </div>
        
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            {event.venue}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ""} registered
          </div>
          {event.status === "upcoming" && (
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                handleRegister(event.id);
              }}
            >
              Register
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Events</h1>
              <p className="text-muted-foreground">
                Discover and participate in upcoming Rotaract activities
              </p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search events..."
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
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="upcoming">
              Upcoming ({getEventsByStatus("upcoming").length})
            </TabsTrigger>
            <TabsTrigger value="ongoing">
              Ongoing ({getEventsByStatus("ongoing").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Past Events ({getEventsByStatus("completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="glass-card animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getEventsByStatus("upcoming").map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEventsByStatus("ongoing").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEventsByStatus("completed").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Event Detail Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl glass-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">
                {selectedEvent?.title}
              </DialogTitle>
              <DialogDescription>
                Organized by {selectedEvent?.organizer}
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{selectedEvent.category}</Badge>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedEvent.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Venue</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.venue}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedEvent.attendees} registered
                          {selectedEvent.maxAttendees && ` of ${selectedEvent.maxAttendees}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedEvent.status === "upcoming" && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button 
                      className="flex-1"
                      onClick={() => handleRegister(selectedEvent.id)}
                    >
                      Register for Event
                    </Button>
                    <Button variant="outline">
                      Share Event
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Events;