import UserList from './UserList';

function App() {
	return (
		<div className="app-shell">
			<header className="topbar">
				<div className="brand-mark" aria-hidden="true">T</div>
				<div>
					
					<p className="brand-name">Test API</p>
				</div>
			
			</header>

			<main className="page-content">
				<section className="intro">
					<div>
						<p className="eyebrow">Répertoire d’équipe</p>
						<h1>Les personnes derrière les données.</h1>
						<p className="intro-copy">
							Une vue simple et rapide des utilisateurs récupérés depuis JSONPlaceholder.
						</p>
					</div>
	
				</section>

				<UserList />
			</main>
		</div>
	);
}

export default App;
