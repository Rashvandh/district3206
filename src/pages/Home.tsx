import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Megaphone, ArrowRight, Award, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import rotaractLogo from '@/assets/rotaract-logo.png';
import apiClient from '@/lib/api/apiClient';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    }
  }
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
}

interface LeadershipMember {
  name: string;
  position: string;
  image?: string;
  club: string;
}

const Home: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [leadershipTeam, setLeadershipTeam] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState({
    events: true,
    leadership: true
  });
  const [error, setError] = useState({
    events: '',
    leadership: ''
  });

  // Mock data for fallback
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Community Service Day",
      date: "2024-09-20",
      time: "09:00 AM",
      venue: "Central Park",
      category: "Community Service"
    },
    {
      id: "2",
      title: "Leadership Workshop",
      date: "2024-09-25",
      time: "02:00 PM",
      venue: "Community Center",
      category: "Workshop"
    }
  ];

  const mockLeadership: LeadershipMember[] = [
    {
      name: "John Doe",
      position: "District President",
      club: "Main Rotaract Club"
    },
    {
      name: "Jane Smith",
      position: "Vice President",
      club: "Downtown Rotaract Club"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await apiClient.get<Event[]>('/events/upcoming');
        setUpcomingEvents(eventsResponse.data);
        setLoading(prev => ({ ...prev, events: false }));
      } catch (err) {
        console.warn('Using mock events data due to API error:', err);
        setUpcomingEvents(mockEvents);
        setError(prev => ({ ...prev, events: '' }));
        setLoading(prev => ({ ...prev, events: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await apiClient.get<LeadershipMember[]>('/leadership');
        setLeadershipTeam(response.data);
        setLoading(prev => ({ ...prev, leadership: false }));
      } catch (err) {
        console.warn('Using mock leadership data due to API error:', err);
        setLeadershipTeam(mockLeadership);
        setError(prev => ({ ...prev, leadership: '' }));
        setLoading(prev => ({ ...prev, leadership: false }));
      }
    };

    fetchLeadership();
  }, []);

  if (error.events || error.leadership) {
    return (
      <div className="container mx-auto p-4">
        {error.events && <div className="text-red-500 mb-4">{error.events}</div>}
        {error.leadership && <div className="text-red-500">{error.leadership}</div>}
      </div>
    );
  }

  const achievements = [
    { number: "150+", label: "Active Members", icon: Users },
    { number: "25", label: "Clubs", icon: Heart },
    { number: "500+", label: "Projects Completed", icon: Award },
    { number: "10K+", label: "Lives Impacted", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-up">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                District 3206 • Building Communities Together
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Empowering Youth,
                <span className="block text-gradient-gold">
                  Transforming Communities
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Join Rotaract District 3206 in our mission to create positive change through 
                leadership development, community service, and international understanding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="secondary" asChild className="hover-lift">
                  <Link to="/members">
                    <Users className="mr-2 h-5 w-5" />
                    Join Our Community
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="glass-card text-white border-white/30 hover:bg-white/20">
                  <Link to="/events">
                    <Calendar className="mr-2 h-5 w-5" />
                    View Events
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-scale-in">
              <div className="glass-card-strong p-8 max-w-md">
                <img 
                  src={rotaractLogo} 
                  alt="Rotaract District 3206 Logo" 
                  className="w-full h-auto mb-6"
                />
                <div className="text-center text-white">
                  <p className="text-white/80">
                    "Lets Unite For Good" - Building communities together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <Card key={index} className="glass-card text-center hover-lift">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-heading font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About District 3206 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">About Rotaract District 3206</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Target className="mr-2 h-5 w-5" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To provide opportunities for young people to enhance knowledge and skills, 
                      address physical and social needs of communities, and promote international 
                      understanding and peace.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Award className="mr-2 h-5 w-5" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To be recognized as a leader in uniting young people to take action and 
                      create lasting change in communities around the world.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Rotaract District 3206 encompasses a vibrant network of clubs dedicated to 
                developing leadership skills while serving our communities. Through various 
                projects and initiatives, our members make meaningful contributions that 
                create lasting positive impact.
              </p>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-primary">Leadership Team</CardTitle>
                  <CardDescription>
                    Meet our dedicated district leadership
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {leadershipTeam.map((leader, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{leader.name}</p>
                        <p className="text-sm text-muted-foreground">{leader.position}</p>
                        <p className="text-xs text-muted-foreground">{leader.club}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
                        {/* Four-Way Test Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">The Four-Way Test</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Of the things we think, say or do, we ask ourselves:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                number: "1",
                text: "Is it the TRUTH?",
                description: "We believe in honesty and integrity in all our actions and communications."
              },
              {
                number: "2",
                text: "Is it FAIR to all concerned?",
                description: "We strive for fairness and justice in all our dealings."
              },
              {
                number: "3",
                text: "Will it build GOODWILL and BETTER FRIENDSHIPS?",
                description: "We aim to strengthen relationships and foster understanding."
              },
              {
                number: "4",
                text: "Will it be BENEFICIAL to all concerned?",
                description: "We seek outcomes that create positive impact for everyone involved."
              }
            ].map((item) => (
              <Card key={item.number} className="h-full flex flex-col glass-card hover-lift">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4 mx-auto">
                    {item.number}
                  </div>
                  <CardTitle className="text-center text-lg font-medium">
                    {item.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center">
                  <p className="text-center text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              The Four-Way Test is a nonpartisan and nonsectarian ethical guide for Rotarians to use for their personal and professional relationships.
            </p>
          </div>
        </div>
      </section>
      {/* Upcoming Events */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">
                Join us in our upcoming activities and make a difference
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading.events ? (
              // Loading skeletons
              [...Array(3)].map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="glass-card hover-lift group cursor-pointer">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {event.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center">
                        <Target className="mr-2 h-4 w-4" />
                        {event.venue}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming events scheduled. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="glass-card-strong text-center p-12 hero-gradient text-white">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join Rotaract District 3206 and be part of a global movement of young leaders 
              committed to creating positive change in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="hover-lift">
                <Link to="/members">
                  <Users className="mr-2 h-5 w-5" />
                  Become a Member
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-card text-white border-white/30 hover:bg-white/20">
                <Link to="/announcements">
                  <Megaphone className="mr-2 h-5 w-5" />
                  Stay Updated
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;