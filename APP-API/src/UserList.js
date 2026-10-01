import { createElement, useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        setListOfUser(response.data);
      } catch {
        setError('Impossible de charger la liste des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return createElement('p', null, 'Chargement des utilisateurs...');
  }

  if (error) {
    return createElement('p', { role: 'alert' }, error);
  }

  const filteredUsers = listOfUser.filter((user) => {
    const searchValue = search.toLowerCase();
    return `${user.name} ${user.email} ${user.company.name}`
      .toLowerCase()
      .includes(searchValue);
  });

  return createElement(
    'section',
    { className: 'directory' },
    createElement(
      'div',
      { className: 'directory-toolbar' },
      createElement(
        'div',
        null,
        createElement('p', { className: 'section-label' }, 'Utilisateurs'),
        createElement(
          'p',
          { className: 'result-count' },
          `${filteredUsers.length} profil${filteredUsers.length > 1 ? 's' : ''}`
        )
      ),
      createElement(
        'label',
        { className: 'search-field' },
        createElement('span', { className: 'search-icon', 'aria-hidden': 'true' }, '⌕'),
        createElement('span', { className: 'sr-only' }, 'Rechercher un utilisateur'),
        createElement('input', {
          type: 'search',
          value: search,
          onChange: (event) => setSearch(event.target.value),
          placeholder: 'Rechercher...',
        })
      )
    ),
    createElement(
      'ul',
      { className: 'user-grid' },
      filteredUsers.map((user) =>
      createElement(
        'li',
        { className: 'user-card', key: user.id },
        createElement('div', { className: 'avatar' }, user.name.charAt(0)),
        createElement(
          'div',
          { className: 'user-card-body' },
          createElement('h2', null, user.name),
          createElement('a', { href: `mailto:${user.email}` }, user.email),
          createElement('p', { className: 'user-company' }, user.company.name)
        ),
        createElement('span', { className: 'user-arrow', 'aria-hidden': 'true' }, '↗')
      )
      )
    ),
    filteredUsers.length === 0 &&
      createElement('p', { className: 'empty-state' }, 'Aucun utilisateur trouvé.')
  );
}

export default UserList;
