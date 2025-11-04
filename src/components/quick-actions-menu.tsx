'use client';

import { Plus, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  description?: string;
  disabled?: boolean;
}

export interface QuickActionGroup {
  label: string;
  actions: QuickAction[];
}

interface QuickActionsMenuProps {
  actions: QuickAction[];
  groups?: QuickActionGroup[];
  label?: string;
}

export function QuickActionsMenu({ actions, groups, label = 'Quick Actions' }: QuickActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {actions.length > 0 && (
          <>
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <DropdownMenuItem
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span>{action.label}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            {groups && groups.length > 0 && <DropdownMenuSeparator />}
          </>
        )}
        {groups?.map((group, groupIndex) => (
          <div key={groupIndex}>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.actions.map((action, actionIndex) => {
              const Icon = action.icon;
              return (
                <DropdownMenuItem
                  key={actionIndex}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span>{action.label}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            {groupIndex < groups.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
