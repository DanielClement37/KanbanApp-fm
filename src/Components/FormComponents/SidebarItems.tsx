import React from "react";

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    isSelected?: boolean;
    isPurple?: boolean;
    onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({icon, label, isSelected = false, isPurple = false, onClick}) => (
    <div className={`sidebar-item ${isSelected ? "selected" : "grey-text"} ${isPurple ? "purple-text" : ""}`} onClick={onClick}>
        <div className="item-content">
            <div className="icon-container">{icon}</div>
            <p className="item-label heading-M">{label}</p>
        </div>
    </div>
);