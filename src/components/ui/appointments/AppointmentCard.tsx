import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Appointment } from '../../../types';
import { Badge } from '../Badge';
import { Card } from '../Card';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick?: () => void;
}

const statusVariants = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info'
} as const;

export function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
    return (
      <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {appointment.doctorName}
              </h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {appointment.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {appointment.time}
                </div>
              </div>
            </div>
            <Badge variant={statusVariants[appointment.status]}>
              {appointment.status}
            </Badge>
          </div>
          {appointment.symptoms && (
            <div className="mt-3 flex items-start text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
              <p>{appointment.symptoms}</p>
            </div>
          )}
        </Card>
      </div>
    );
  }
  