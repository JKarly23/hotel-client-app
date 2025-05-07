export const usersWithActiveBookings = (users) => users.filter(u =>
    u.bookings?.some(b => new Date(b.checkOutDate) > new Date())
).length;

export const recentLogins = (users) => users.filter(u => {
    const lastLogin = new Date(u.lastLogin);
    const now = new Date();
    const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
}).length;

export const avgAge = (users) => Math.floor(users.reduce((sum, u) => {
    const birth = new Date(u.birthDate);
    const age = new Date().getFullYear() - birth.getFullYear();
    return sum + age;
}, 0) / users.length);


export const countByUserRole = (users) => {
    return users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {});
};

export const avgBookingsPerUser = (users) => {
    let suma = 0;
    users.map((user) => suma += user.bookings.length);
    return (suma / users.length).toFixed(2);
}

export const usersWithRolesUser = (users) => users.filter(u => u.role === 'user').length

export const usersWithRolesAdmin = (users) => users.filter(u => u.role === 'admin').length

export const usersActive = (users) => {
    return users.filter(user => {
        // Check if user has both login and logout timestamps
        if (!user.lastLogin || !user.lastLogout) {
            return false;
        }
        
        const lastLogin = new Date(user.lastLogin);
        const lastLogout = new Date(user.lastLogout);
        
        // User is considered active if their last login is more recent than their last logout
        return lastLogin > lastLogout;
    }).length;
}
