import { NextPage } from 'next';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useTeam } from '../../context/TeamContext';

const specializations = [
  "Web Development",
  "AI/ML",
  "Blockchain",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Development",
  "UI/UX Design",
  "DevOps",
  "Data Science",
  "IoT",
  "Quantum Computing",
  "Game Development"
];

const CreateTeam: NextPage = () => {
  const router = useRouter();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    leader: '',
    description: '',
    membersCount: '',
    tags: [] as string[],
    teamBanner: null as File | null,
    teamLogo: null as File | null
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewBanner, setPreviewBanner] = useState<string>('');
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const { addTeam } = useTeam();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') {
          setPreviewBanner(reader.result as string);
          setFormData(prev => ({ ...prev, teamBanner: file }));
        } else {
          setPreviewLogo(reader.result as string);
          setFormData(prev => ({ ...prev, teamLogo: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTeam = {
      id: Date.now(), // In production, this would come from the backend
      teamName: formData.name,
      leader: formData.leader,
      description: formData.description,
      membersCount: parseInt(formData.membersCount),
      tags: selectedTags,
      teamImage: previewBanner || '/images/team-placeholder.png',
      leaderImage: previewLogo || '/images/avatar-placeholder.png',
      links: {
        view: `/teams/${Date.now()}`,
        external: `https://github.com/${formData.name.replace(/\s+/g, '')}`
      }
    };

    try {
      addTeam(newTeam);
      router.push('/teams');
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Create New Team</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Fields */}
            <div className="space-y-6">
              {/* Team Banner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Banner
                </label>
                <div 
                  onClick={() => bannerInputRef.current?.click()}
                  className="relative cursor-pointer group"
                >
                  <div className={`w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center ${previewBanner ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    {previewBanner ? (
                      <Image
                        src={previewBanner}
                        alt="Team banner preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-medium text-gray-600">
                          Upload team banner
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Team Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Logo
                </label>
                <div 
                  onClick={() => logoInputRef.current?.click()}
                  className="relative cursor-pointer group"
                >
                  <div className={`w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center ${previewLogo ? 'bg-gray-100' : 'bg-gray-50'} hover:bg-gray-100 transition-colors mx-auto`}>
                    {previewLogo ? (
                      <Image
                        src={previewLogo}
                        alt="Team logo preview"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <span className="mt-2 block text-xs font-medium text-gray-600">
                          Upload logo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Team Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Enter team name"
              />
            </div>

            {/* Team Leader */}
            <div>
              <label htmlFor="leader" className="block text-sm font-medium text-gray-700 mb-2">
                Led By
              </label>
              <input
                type="text"
                id="leader"
                value={formData.leader}
                onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Team leader's name"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Team Tagline
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                placeholder="Brief description of your team"
              />
            </div>

            {/* Members Count */}
            <div>
              <label htmlFor="membersCount" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Members
              </label>
              <input
                type="number"
                id="membersCount"
                value={formData.membersCount}
                onChange={(e) => setFormData({ ...formData, membersCount: e.target.value })}
                min="1"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Enter team size"
              />
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specializations
              </label>
              <div className="mb-3">
                <select
                  onChange={(e) => addTag(e.target.value)}
                  value=""
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                >
                  <option value="">Select specializations</option>
                  {specializations
                    .filter(spec => !selectedTags.includes(spec))
                    .map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-gray-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam; 