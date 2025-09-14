import { useState, useEffect } from "react";
import { 
  Users, Calendar, Megaphone, BarChart, 
  Plus, Edit, Trash2, Eye, TrendingUp, 
  Download, Filter, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AnalyticsData {
  totalMembers: number;
  totalEvents: number;
  totalAnnouncements: number;
  monthlyGrowth: number;
  recentRegistrations: number;
  activeProjects: number;
}

interface RecentActivity {
  id: string;
  type: "event" | "member" | "announcement";
  action: string;
  target: string;
  user: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalMembers: 0,
    totalEvents: 0,
    totalAnnouncements: 0,
    monthlyGrowth: 0,
    recentRegistrations: 0,
    activeProjects: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setAnalytics({
        totalMembers: 156,
        totalEvents: 42,
        totalAnnouncements: 18,
        monthlyGrowth: 12.5,
        recentRegistrations: 8,
        activeProjects: 15
      });

      setRecentActivity([
        {
          id: "1",
          type: "event",
          action: "created",
          target: "Blood Drive 2024",
          user: "Sarah Johnson",
          timestamp: "2 hours ago"
        },
        {
          id: "2", 
          type: "member",
          action: "registered",
          target: "Leadership Workshop",
          user: "Michael Chen",
          timestamp: "4 hours ago"
        },
        {
          id: "3",
          type: "announcement",
          action: "published",
          target: "Grant Deadline Extension",
          user: "Emma Rodriguez",
          timestamp: "6 hours ago"
        },
        {
          id: "4",
          type: "member",
          action: "joined",
          target: "District 3206",
          user: "Lisa Wang",
          timestamp: "1 day ago"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "event": return <Calendar className="h-4 w-4 text-blue-500" />;
      case "member": return <Users className="h-4 w-4 text-green-500" />;
      case "announcement": return <Megaphone className="h-4 w-4 text-orange-500" />;
      default: return <BarChart className="h-4 w-4" />;
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: number | string;
    change?: number;
    icon: any;
    color: string;
  }) => (
    <Card className="glass-card hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {change > 0 ? '+' : ''}{change}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
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
              <h1 className="text-3xl font-heading font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your Rotaract District 3206 operations
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Quick Action
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Members"
            value={analytics.totalMembers}
            change={analytics.monthlyGrowth}
            icon={Users}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Events"
            value={analytics.totalEvents}
            change={8.2}
            icon={Calendar}
            color="bg-green-500"
          />
          <StatCard
            title="Announcements"
            value={analytics.totalAnnouncements}
            change={-2.1}
            icon={Megaphone}
            color="bg-orange-500"
          />
          <StatCard
            title="New Registrations"
            value={analytics.recentRegistrations}
            icon={TrendingUp}
            color="bg-purple-500"
          />
          <StatCard
            title="Active Projects"
            value={analytics.activeProjects}
            icon={BarChart}
            color="bg-red-500"
          />
          <StatCard
            title="Monthly Growth"
            value={`${analytics.monthlyGrowth}%`}
            icon={TrendingUp}
            color="bg-indigo-500"
          />
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions in your district</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 animate-pulse">
                          <div className="w-8 h-8 bg-muted rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action} <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span className="text-sm">Create Event</span>
                    </Button>
                    <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Add Member</span>
                    </Button>
                    <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                      <Megaphone className="h-6 w-6 mb-2" />
                      <span className="text-sm">Send Notice</span>
                    </Button>
                    <Button className="h-auto p-4 flex flex-col items-center" variant="outline">
                      <BarChart className="h-6 w-6 mb-2" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Management Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2">
                <Input placeholder="Search events..." className="glass-card" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>

            <Card className="glass-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium">Blood Drive 2024</p>
                        <p className="text-sm text-muted-foreground">Community Service</p>
                      </div>
                    </TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>
                      <Badge>Upcoming</Badge>
                    </TableCell>
                    <TableCell>45/100</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {/* More rows would be dynamically generated */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Members Management Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2">
                <Input placeholder="Search members..." className="glass-card" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>

            <Card className="glass-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">sarah.johnson@email.com</p>
                      </div>
                    </TableCell>
                    <TableCell>Metropolitan RC</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Admin</Badge>
                    </TableCell>
                    <TableCell>Aug 15, 2021</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {/* More rows would be dynamically generated */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Announcements Management Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2">
                <Input placeholder="Search announcements..." className="glass-card" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
            </div>

            <Card className="glass-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium">District Conference 2024</p>
                        <p className="text-sm text-muted-foreground">Registration now open...</p>
                      </div>
                    </TableCell>
                    <TableCell>District Events</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-500 text-white">High</Badge>
                    </TableCell>
                    <TableCell>Jan 10, 2024</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {/* More rows would be dynamically generated */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Membership Growth</CardTitle>
                  <CardDescription>Monthly member registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mb-2" />
                    <p>Chart visualization would be implemented here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Event Participation</CardTitle>
                  <CardDescription>Average attendance by event category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mb-2" />
                    <p>Chart visualization would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;