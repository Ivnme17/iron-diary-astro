import { useState } from 'react';

interface MuscleGroup {
  name: string;
  zones: string[];
  color: string;
}

const muscleGroups: MuscleGroup[] = [
  { name: 'Pecho', zones: ['chest'], color: '#ef4444' },
  { name: 'Espalda', zones: ['back'], color: '#3b82f6' },
  { name: 'Hombros', zones: ['shoulders'], color: '#f59e0b' },
  { name: 'Bíceps', zones: ['biceps'], color: '#8b5cf6' },
  { name: 'Tríceps', zones: ['triceps'], color: '#ec4899' },
  { name: 'Piernas', zones: ['quads', 'hamstrings', 'calves'], color: '#10b981' },
  { name: 'Abdomen', zones: ['abs'], color: '#f97316' },
];

const exerciseMuscleMap: { [key: string]: string[] } = {
  // Push Day
  'press banca': ['chest', 'triceps', 'shoulders'],
  'press inclinado': ['chest', 'triceps', 'shoulders'],
  'fondos': ['chest', 'triceps', 'shoulders'],
  'extensión tríceps': ['triceps'],
  'aperturas': ['chest'],
  'press arnold': ['shoulders', 'triceps'],
  'tríceps cuerda': ['triceps'],
  
  // Pull Day
  'peso muerto': ['back', 'hamstrings', 'glutes'],
  'dominadas': ['back', 'biceps'],
  'remo': ['back', 'biceps'],
  'curl bíceps': ['biceps'],
  'jalón': ['back', 'biceps'],
  'encogimientos': ['shoulders', 'traps'],
  'peso muerto rumano': ['hamstrings', 'glutes', 'back'],
  
  // Leg Day
  'sentadilla': ['quads', 'hamstrings', 'glutes'],
  'prensa': ['quads', 'hamstrings'],
  'curl femoral': ['hamstrings'],
  'elevación gemelos': ['calves'],
  'sentadilla goblet': ['quads', 'glutes'],
  'hip thrust': ['glutes', 'hamstrings'],
  
  // Core
  'plancha': ['abs', 'core'],
  'crunch': ['abs'],
  'elevación de piernas': ['abs', 'lower_back'],
};

export default function MuscleMap({ exerciseNames }: { exerciseNames: string[] }) {
  const [activeMuscles, setActiveMuscles] = useState<string[]>([]);

  // Get muscles activated by exercises
  React.useEffect(() => {
    const muscles = new Set<string>();
    exerciseNames.forEach((name: string) => {
      const normalizedName = name.toLowerCase();
      Object.keys(exerciseMuscleMap).forEach((key: string) => {
        if (normalizedName.includes(key) && exerciseMuscleMap[key]) {
          exerciseMuscleMap[key]!.forEach((muscle: string) => muscles.add(muscle));
        }
      });
    });
    setActiveMuscles(Array.from(muscles));
  }, [exerciseNames]);

  const getMuscleColor = (zone: string): string => {
    const group = muscleGroups.find(g => g.zones.includes(zone));
    return activeMuscles.includes(zone) ? (group?.color || '#e5e7eb') : '#f3f4f6';
  };

  const getMuscleColorClass = (zone: string): string => {
    const group = muscleGroups.find(g => g.zones.includes(zone));
    if (activeMuscles.includes(zone) && group) {
      return `muscle-${zone}`;
    }
    return 'muscle-inactive';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Zonas Musculares Activadas</h3>
      
      {/* Front View */}
      <div className="flex justify-center mb-6">
        <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-sm">
          {/* Head */}
          <circle cx="100" cy="30" r="20" fill="#fbbf24" stroke="#92400e" strokeWidth="1"/>
          
          {/* Neck */}
          <rect x="90" y="45" width="20" height="15" fill="#fbbf24"/>
          
          {/* Shoulders */}
          <ellipse cx="60" cy="65" rx="15" ry="10" className={getMuscleColorClass('shoulders')}/>
          <ellipse cx="140" cy="65" rx="15" ry="10" className={getMuscleColorClass('shoulders')}/>
          
          {/* Chest */}
          <ellipse cx="100" cy="85" rx="30" ry="20" className={getMuscleColorClass('chest')}/>
          
          {/* Abs */}
          <rect x="85" y="100" width="30" height="25" rx="5" className={getMuscleColorClass('abs')}/>
          
          {/* Biceps */}
          <ellipse cx="55" cy="90" rx="8" ry="15" className={getMuscleColorClass('biceps')}/>
          <ellipse cx="145" cy="90" rx="8" ry="15" className={getMuscleColorClass('biceps')}/>
          
          {/* Triceps */}
          <ellipse cx="65" cy="90" rx="6" ry="12" className={getMuscleColorClass('triceps')}/>
          <ellipse cx="135" cy="90" rx="6" ry="12" className={getMuscleColorClass('triceps')}/>
          
          {/* Forearms */}
          <rect x="52" y="105" width="8" height="20" fill="#fbbf24"/>
          <rect x="140" y="105" width="8" height="20" fill="#fbbf24"/>
          
          {/* Quads */}
          <ellipse cx="80" cy="150" rx="12" ry="25" className={getMuscleColorClass('quads')}/>
          <ellipse cx="120" cy="150" rx="12" ry="25" className={getMuscleColorClass('quads')}/>
          
          {/* Calves */}
          <ellipse cx="85" cy="220" rx="8" ry="20" className={getMuscleColorClass('calves')}/>
          <ellipse cx="115" cy="220" rx="8" ry="20" className={getMuscleColorClass('calves')}/>
          
          {/* Hands */}
          <circle cx="50" cy="130" r="6" fill="#fbbf24"/>
          <circle cx="150" cy="130" r="6" fill="#fbbf24"/>
          
          {/* Feet */}
          <ellipse cx="85" cy="280" rx="10" ry="6" fill="#92400e"/>
          <ellipse cx="115" cy="280" rx="10" ry="6" fill="#92400e"/>
        </svg>
      </div>

      {/* Back View */}
      <div className="flex justify-center mb-6">
        <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-sm">
          {/* Head */}
          <circle cx="100" cy="30" r="20" fill="#fbbf24" stroke="#92400e" strokeWidth="1"/>
          
          {/* Neck */}
          <rect x="90" y="45" width="20" height="15" fill="#fbbf24"/>
          
          {/* Shoulders/Traps */}
          <ellipse cx="100" cy="60" rx="35" ry="15" className={getMuscleColorClass('shoulders')}/>
          
          {/* Back */}
          <ellipse cx="100" cy="85" rx="25" ry="30" className={getMuscleColorClass('back')}/>
          
          {/* Lower Back */}
          <rect x="85" y="110" width="30" height="20" rx="5" className={getMuscleColorClass('lower_back')}/>
          
          {/* Glutes */}
          <ellipse cx="85" cy="140" rx="12" ry="15" className={getMuscleColorClass('glutes')}/>
          <ellipse cx="115" cy="140" rx="12" ry="15" className={getMuscleColorClass('glutes')}/>
          
          {/* Hamstrings */}
          <ellipse cx="85" cy="170" rx="10" ry="20" className={getMuscleColorClass('hamstrings')}/>
          <ellipse cx="115" cy="170" rx="10" ry="20" className={getMuscleColorClass('hamstrings')}/>
          
          {/* Calves */}
          <ellipse cx="85" cy="220" rx="8" ry="20" className={getMuscleColorClass('calves')}/>
          <ellipse cx="115" cy="220" rx="8" ry="20" className={getMuscleColorClass('calves')}/>
          
          {/* Feet */}
          <ellipse cx="85" cy="280" rx="10" ry="6" fill="#92400e"/>
          <ellipse cx="115" cy="280" rx="10" ry="6" fill="#92400e"/>
        </svg>
      </div>

      {/* Muscle Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {muscleGroups.map(group => {
          const isActive = group.zones.some((zone: string) => activeMuscles.includes(zone));
          return (
            <div key={group.name} className={`flex items-center gap-2 px-2 py-1 rounded ${isActive ? 'bg-secondary' : 'text-muted-foreground'}`}>
              <div 
                className={`w-3 h-3 rounded-full ${isActive ? `muscle-indicator-${group.name.toLowerCase()}` : 'muscle-inactive'}`}
              />
              <span className={isActive ? 'font-medium' : ''}>{group.name}</span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .muscle-chest { fill: #ef4444; }
        .muscle-back { fill: #3b82f6; }
        .muscle-shoulders { fill: #f59e0b; }
        .muscle-biceps { fill: #8b5cf6; }
        .muscle-triceps { fill: #ec4899; }
        .muscle-quads { fill: #10b981; }
        .muscle-hamstrings { fill: #10b981; }
        .muscle-calves { fill: #10b981; }
        .muscle-abs { fill: #f97316; }
        .muscle-glutes { fill: #10b981; }
        .muscle-lower_back { fill: #3b82f6; }
        .muscle-inactive { fill: #f3f4f6; }
        
        .muscle-indicator-pecho { background-color: #ef4444; }
        .muscle-indicator-espalda { background-color: #3b82f6; }
        .muscle-indicator-hombros { background-color: #f59e0b; }
        .muscle-indicator-bíceps { background-color: #8b5cf6; }
        .muscle-indicator-tríceps { background-color: #ec4899; }
        .muscle-indicator-piernas { background-color: #10b981; }
        .muscle-indicator-abdomen { background-color: #f97316; }
      `}</style>
    </div>
  );
}
