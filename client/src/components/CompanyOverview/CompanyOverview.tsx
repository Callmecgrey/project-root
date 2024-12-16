// src/components/CompanyOverview/CompanyOverview.tsx

import React from 'react';
import Card from "../ui/Card";
import CardContent from "../ui/Card";
import { Building, Globe, Users } from 'lucide-react';

const features = [
    {
        icon: Building,
        title: "Iconic Projects",
        description: "Work on some of the most prestigious residential projects around the globe.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Your expertise will shape luxury living experiences worldwide.",
    },
    {
        icon: Users,
        title: "Collaborative Culture",
        description: "Join a diverse team that values innovation and excellence.",
    },
];

const CompanyOverview: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-blue-800">Why Work at Elite Residences?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="flex flex-col items-center p-8">
                                <feature.icon className="w-16 h-16 text-blue-600 mb-6" />
                                <h3 className="text-2xl font-semibold mb-4 text-blue-800">{feature.title}</h3>
                                <p className="text-center text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;
