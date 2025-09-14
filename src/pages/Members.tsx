import { useState, useEffect } from "react";
import { Search, Users, Mail, Phone, MapPin, Filter, UserPlus, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockMembers, Member as MemberType } from "@/data/mockMembers";
type Member = MemberType;
interface NewMember {
  name: string;
  email: string;
  phone: string;
  club: string;
  role: string;
  position: string;
  location: string;
  bio: string;
  interests: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageMember, setMessageMember] = useState<Member | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    email: "",
    phone: "",
    club: "",
    role: "member",
    position: "",
    location: "",
    bio: "",
    interests: ""
  });

  const { toast } = useToast();

  // Add Member functionality
  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email || !newMember.phone || !newMember.club) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const member: Member = {
        id: Date.now().toString(),
        ...newMember,
        year: new Date().getFullYear(),
        joinDate: new Date().toISOString(),
        interests: newMember.interests ? newMember.interests.split(",").map(i => i.trim()) : []
      };

      setMembers(prev => [...prev, member]);
      setNewMember({
        name: "",
        email: "",
        phone: "",
        club: "",
        role: "member",
        position: "",
        location: "",
        bio: "",
        interests: ""
      });
      setIsAddMemberOpen(false);
      
      toast({
        title: "Success",
        description: `${member.name} has been added successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      });
    }
  };
// Add this inside your Members component, after the state declarations and before the return statement
useEffect(() => {
  const loadMembers = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMembers(mockMembers);
      setFilteredMembers(mockMembers);
      setLoading(false);
    } catch (error) {
      console.error("Error loading members:", error);
      toast({
        title: "Error",
        description: "Failed to load members. Using sample data instead.",
        variant: "destructive",
      });
      setMembers(mockMembers);
      setFilteredMembers(mockMembers);
      setLoading(false);
    }
  };

  loadMembers();
}, []);
  // Export functionality
  const handleExport = () => {
    try {
      const csvContent = [
        "Name,Email,Phone,Club,Role,Position,Location,Join Date",
        ...filteredMembers.map(member => 
          `"${member.name}","${member.email}","${member.phone}","${member.club}","${member.role}","${member.position || ''}","${member.location}","${member.joinDate}"`
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotaract-members-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Exported ${filteredMembers.length} members to CSV file.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export members. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Send Message functionality
  const handleSendMessage = (member: Member) => {
    setMessageMember(member);
    setIsMessageDialogOpen(true);
  };

  const sendMessage = () => {
    if (!messageContent.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a message.",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, this would send through your messaging system
      const subject = encodeURIComponent(`Message from Rotaract District 3206`);
      const body = encodeURIComponent(messageContent);
      const mailtoLink = `mailto:${messageMember?.email}?subject=${subject}&body=${body}`;
      window.open(mailtoLink);

      setMessageContent("");
      setIsMessageDialogOpen(false);
      setMessageMember(null);

      toast({
        title: "Message Sent",
        description: `Email client opened for ${messageMember?.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client.",
        variant: "destructive",
      });
    }
  };

  // Call functionality
  const handleCall = (member: Member) => {
    try {
      window.open(`tel:${member.phone}`);
      toast({
        title: "Calling",
        description: `Initiating call to ${member.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to initiate call.",
        variant: "destructive",
      });
    }
  };
  // Filter members
  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClub !== "all") {
      filtered = filtered.filter(member => member.club === selectedClub);
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter(member => member.role === selectedRole);
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter(member => member.year.toString() === selectedYear);
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, selectedClub, selectedRole, selectedYear]);

  const clubs = [...new Set(members.map(member => member.club))];
  const roles = [...new Set(members.map(member => member.role))];
  const years = [...new Set(members.map(member => member.year))];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-primary text-primary-foreground";
      case "officer": return "bg-secondary text-secondary-foreground";
      case "member": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const MemberCard = ({ member }: { member: Member }) => (
    <Card 
      className="glass-card hover-lift group cursor-pointer"
      onClick={() => setSelectedMember(member)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                {member.name}
              </h3>
              <Badge className={getRoleColor(member.role)} variant="secondary">
                {member.role}
              </Badge>
            </div>
            
            {member.position && (
              <p className="text-primary font-medium text-sm mb-1">
                {member.position}
              </p>
            )}
            
            <p className="text-muted-foreground text-sm mb-3 truncate">
              {member.club}
            </p>
            
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {member.location}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-3 w-3" />
                Member since {new Date(member.joinDate).getFullYear()}
              </div>
            </div>
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
              <h1 className="text-3xl font-heading font-bold mb-2">Members Directory</h1>
              <p className="text-muted-foreground">
                Connect with {filteredMembers.length} active members across District 3206
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl glass-card">
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                    <DialogDescription>
                      Add a new member to Rotaract District 3206
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newMember.name}
                        onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={newMember.phone}
                        onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1-234-567-8900"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="club">Club *</Label>
                      <Select value={newMember.club} onValueChange={(value) => setNewMember(prev => ({ ...prev, club: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Club" />
                        </SelectTrigger>
                        <SelectContent>
                          {clubs.map(club => (
                            <SelectItem key={club} value={club}>{club}</SelectItem>
                          ))}
                          <SelectItem value="new">Other (Please specify)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={newMember.role} onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="officer">Officer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={newMember.position}
                        onChange={(e) => setNewMember(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="Club President, Secretary, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newMember.location}
                        onChange={(e) => setNewMember(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, State"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests (comma separated)</Label>
                      <Input
                        id="interests"
                        value={newMember.interests}
                        onChange={(e) => setNewMember(prev => ({ ...prev, interests: e.target.value }))}
                        placeholder="Leadership, Community Service, Technology"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={newMember.bio}
                        onChange={(e) => setNewMember(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Brief description about the member..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button onClick={handleAddMember} className="flex-1">
                      Add Member
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members, clubs, positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-card"
                />
              </div>
            </div>
            
            <Select value={selectedClub} onValueChange={setSelectedClub}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="All Clubs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clubs</SelectItem>
                {clubs.map(club => (
                  <SelectItem key={club} value={club}>{club}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role} className="capitalize">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{members.length}</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{clubs.length}</div>
              <div className="text-sm text-muted-foreground">Active Clubs</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {members.filter(m => m.role === "admin").length}
              </div>
              <div className="text-sm text-muted-foreground">Administrators</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {new Date().getFullYear() - Math.min(...years) + 1}
              </div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-card animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                      <div className="h-3 bg-muted rounded w-2/3 mb-3"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No members found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Member Detail Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-2xl glass-card">
            <DialogHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember?.avatar} alt={selectedMember?.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {selectedMember && getInitials(selectedMember.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl font-heading">
                    {selectedMember?.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedMember?.position} • {selectedMember?.club}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(selectedMember.role)} variant="secondary">
                    {selectedMember.role}
                  </Badge>
                  <Badge variant="outline">
                    Member since {new Date(selectedMember.joinDate).getFullYear()}
                  </Badge>
                </div>

                {selectedMember.bio && (
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`mailto:${selectedMember.email}`}
                          className="text-sm hover:text-primary transition-colors"
                        >
                          {selectedMember.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`tel:${selectedMember.phone}`}
                          className="text-sm hover:text-primary transition-colors"
                        >
                          {selectedMember.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedMember.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedMember.interests && (
                    <div>
                      <h4 className="font-semibold mb-3">Interests & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSendMessage(selectedMember)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleCall(selectedMember)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Send Message Modal */}
        <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Send a message to {messageMember?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button onClick={sendMessage} className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Members;