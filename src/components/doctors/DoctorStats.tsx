import React from 'react';
import { Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

function StatsCard({ icon, label, value, bgColor, textColor }: StatsCardProps) {
  return (
    <div className={`p-4 ${bgColor} rounded-lg`}>
      <div className="flex items-center justify-between">
        <div className={`${textColor}`}>{icon}</div>
        <div className="text-right">
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

interface DoctorStatsProps {
  totalPatients: number;
  completedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
}

export function DoctorStats({
  totalPatients,
  completedAppointments,
  pendingAppointments,
  cancelledAppointments
}: DoctorStatsProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          label="Total Patients"
          value={totalPatients}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatsCard
          icon={<CheckCircle className="w-6 h-6" />}
          label="Completed"
          value={completedAppointments}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatsCard
          icon={<Clock className="w-6 h-6" />}
          label="Pending"
          value={pendingAppointments}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatsCard
          icon={<XCircle className="w-6 h-6" />}
          label="Cancelled"
          value={cancelledAppointments}
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
      </div>
    </Card>
  );
}