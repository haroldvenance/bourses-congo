// Base de données locale des événements (mettez à jour manuellement)
const evenements = [
    {
        titre: "Bourse Ambassade de France",
        date: "2026-04-30",
        region: "National",
        urlFiche: "fiches/bourse-ambassade-france.html",
        conditions: "Étudiant congolais, projet France, moins de 28 ans"
    },
    {
        titre: "Concours ENSP Brazzaville",
        date: "2026-05-15",
        region: "Brazzaville",
        urlFiche: "fiches/concours-ensp-brazzaville.html",
        conditions: "Bac+2 minimum, inscription à l'ENSP"
    },
    {
        titre: "Bourse Congo Pétrole",
        date: "2026-06-10",
        region: "Pointe-Noire",
        urlFiche: "fiches/bourse-congo-petrole.html",
        conditions: "Filière pétrole/gaz, moyenne ≥ 14"
    },
    {
        titre: "Nouvelle Bourse",
        date: "2026-07-20",
        region: "Brazzaville",
        urlFiche: "fiches/bourse-nouvelle.html",
        conditions: "Conditions ici"
    }
    // Ajoutez d'autres événements ici
];

// Fonction pour formater une date JJ/MM/AAAA
function formatDateFr(dateStr) {
    const [annee, mois, jour] = dateStr.split('-');
    return `${jour}/${mois}/${annee}`;
}

// Fonction pour afficher le tableau selon la région sélectionnée
function afficherTableau(regionFiltre) {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const filtres = evenements.filter(ev => regionFiltre === 'all' || ev.region === regionFiltre);
    
    if (filtres.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Aucune échéance pour cette région pour le moment.</td></tr>';
        return;
    }
    
    filtres.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    for (let ev of filtres) {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = formatDateFr(ev.date);
        row.insertCell(1).textContent = ev.titre;
        row.insertCell(2).textContent = ev.region;
        const lienCell = row.insertCell(3);
        const lien = document.createElement('a');
        lien.href = ev.urlFiche;
        lien.textContent = 'Voir la fiche';
        lien.target = '_blank';
        lienCell.appendChild(lien);
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const selectRegion = document.getElementById('region-select');
    if (selectRegion) {
        afficherTableau(selectRegion.value);
        selectRegion.addEventListener('change', (e) => {
            afficherTableau(e.target.value);
        });
    }
    
    initButtons();
});

// Gestion des boutons de sauvegarde et partage
function initButtons() {
    // Boutons Sauvegarder
    document.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const titre = btn.getAttribute('data-titre');
            const date = btn.getAttribute('data-date');
            const conditions = btn.getAttribute('data-conditions');
            const url = window.location.href;
            
            let saved = JSON.parse(localStorage.getItem('bourses_saved')) || [];
            const alreadyExists = saved.some(item => item.url === url);
            
            if (!alreadyExists) {
                saved.push({ titre, date, conditions, url });
                localStorage.setItem('bourses_saved', JSON.stringify(saved));
                alert('Fiche sauvegardée avec succès. Vous pourrez la consulter hors ligne.');
            } else {
                alert('Cette fiche est déjà dans vos sauvegardes.');
            }
        });
    });
    
    // Boutons Partager sur WhatsApp
    document.querySelectorAll('.btn-share').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const titre = btn.getAttribute('data-titre');
            const url = btn.getAttribute('data-url') || window.location.href;
            // Message sans emoji, propre
            const message = `*${titre}*%0A%0ADétails : ${url}%0A%0ASource : Bourses Congo`;
            window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    });
}