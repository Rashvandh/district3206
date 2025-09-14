export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  club: string;
  role: string;
  position?: string;
  year: number;
  avatar?: string;
  location: string;
  joinDate: string;
  bio?: string;
  interests?: string[];
}

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Rashvandh A',
    email: 'rashvandhappukutty@gmail.com',
    phone: '+91 8925647608',
    club: 'Rotaract Club of KPRCAS',
    role: 'Web Chair',
    position: 'Web Chair',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    location: 'Coimbatore, India',
    joinDate: '2021-03-15T00:00:00.000Z',
    bio: 'Passionate about community service and leadership development. Leading our club to make a positive impact.',
    interests: ['Community Service', 'Leadership', 'Networking']
  },
  {
    id: '2',
    name: 'Rithanya L',
    email: 'rithanyalloganathan07@gmail.com',
    phone: '+91 6359878966',
    club: 'Rotaract Club of KPRCAS',
    role: 'Director of Professional Service',
    position: 'Director of Professional Service',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    location: 'Coimbatore, India',
    joinDate: '2020-05-22T00:00:00.000Z',
    bio: 'Dedicated to creating meaningful change through service projects and youth empowerment initiatives.',
    interests: ['Professional Service', 'Fundraising', 'Event Planning']
  },
  {
    id: '3',
    name: 'Rajesh R',
    email: 'rajeshr07@gmail.com',
    phone: '+91 8925647608',
    club: 'Rotaract Club of KPRCAS',
    role: 'Treasurer',
    position: 'Finance Director',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    location: 'Coimbatore, India',
    joinDate: '2022-01-10T00:00:00.000Z',
    bio: 'Finance professional passionate about using my skills to support impactful community projects.',
    interests: ['Finance', 'Strategic Planning', 'Project Management']
  },
  {
    id: '4',
    name: 'Rithanyaa R',
    email: 'rithanr5127@gmail.com',
    phone: '+91 6359878966',
    club: 'Rotaract Club of KPRCAS',
    role: 'Secretary',
    position: 'Secretary',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    location: 'Coimbatore, India',
    joinDate: '2021-09-05T00:00:00.000Z',
    bio: 'Organized and detail-oriented, keeping our club running smoothly behind the scenes.',
    interests: ['Administration', 'Communication', 'Event Coordination']
  },
  {
    id: '5',
    name: 'Sivaa SP',
    email: 'sivaasp1078@gmail.com',
    phone: '+91 8925647608',
    club: 'Rotaract Club of KPRCAS',
    role: 'Member',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    location: 'Coimbatore, India',
    joinDate: '2022-03-18T00:00:00.000Z',
    bio: 'New member excited to contribute to meaningful service projects and meet like-minded individuals.',
    interests: ['Community Service', 'Networking', 'Professional Development']
  },
  {
    id: '6',
    name: 'Raagavi AM',
    email: 'raagaviam@gmail.com',
    phone: '+91 6359878966',
    club: 'Rotaract Club of KPRCAS',
    role: 'Member',
    position: 'Member',
    year: 2023,
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    location: 'Coimbatore, India',
    joinDate: '2021-11-30T00:00:00.000Z',
    bio: 'Passionate about organizing impactful service projects that make a real difference in our community.',
    interests: ['Community Service', 'Networking', 'Professional Development']
  }
];
