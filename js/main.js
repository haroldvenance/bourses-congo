// Base de données des opportunités (mettre à jour manuellement)
const evenements = [
    {
        titre: "Bourse d'excellence du Gouvernement congolais",
        annee: "2025-2026",
        zone: "Congo",
        urlFiche: "fiches/bourse-gouvernement-congo.html",
        description: "Bourse pour les étudiants congolais méritants"
    },
    {
        titre: "Concours ENSP Brazzaville",
        annee: "2025-2026",
        zone: "Congo",
        urlFiche: "fiches/concours-ensp.html",
        description: "Concours d'entrée à l'École Normale Supérieure Polytechnique"
    },
    {
        titre: "Programme de bourses CEMAC",
        annee: "2025-2026",
        zone: "Afrique-centrale",
        urlFiche: "fiches/bourse-cemac.html",
        description: "Bourse pour les ressortissants de la CEMAC"
    },
    {
        titre: "Bourse BDEAC",
        annee: "2025-2026",
        zone: "Afrique-centrale",
        urlFiche: "fiches/bourse-bdeac.html",
        description: "Bourse de la Banque de Développement des États de l'Afrique Centrale"
    },
    {
        titre: "Bourse Eiffel (France)",
        annee: "2025-2026",
        zone: "Europe",
        urlFiche: "fiches/bourse-eiffel.html",
        description: "Programme d'excellence du gouvernement français"
    },
    {
        titre: "Bourse Chevening (Royaume-Uni)",
        annee: "2025-2026",
        zone: "Europe",
        urlFiche: "fiches/bourse-chevening.html",
        description: "Bourse du gouvernement britannique"
    },
    {
        titre: "Bourse DAAD (Allemagne)",
        annee: "2025-2026",
        zone: "Europe",
        urlFiche: "fiches/bourse-daad.html",
        description: "Service d'échange académique allemand"
    },
    {
        titre: "Bourse CSC (Chine)",
        annee: "2025-2026",
        zone: "Asie",
        urlFiche: "fiches/bourse-csc-chine.html",
        description: "Bourse du gouvernement chinois"
    },
    {
        titre: "Bourse MEXT (Japon)",
        annee: "2025-2026",
        zone: "Asie",
        urlFiche: "fiches/bourse-mext.html",
        description: "Bourse du gouvernement japonais"
    },
    {
        titre: "Bourse Fulbright (États-Unis)",
        annee: "2025-2026",
        zone: "Amerique",
        urlFiche: "fiches/bourse-fulbright.html",
        description: "Programme d'échange États-Unis"
    },
    {
        titre: "Bourse du Canada",
        annee: "2025-2026",
        zone: "Amerique",
        urlFiche: "fiches/bourse-canada.html",
        description: "Programme de bourses canadiennes"
    },
    {
        titre: "Bourse de la Banque mondiale",
        annee: "2025-2026",
        zone: "Afrique-centrale",
        urlFiche: "fiches/bourse-banque-mondiale.html",
        description: "Pour les étudiants d'Afrique centrale"
    }
];

// Fonction pour afficher le tableau selon la zone sélectionnée
function afficherTableau(zoneFiltre) {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filtres = evenements.filter(ev => zoneFiltre === 'all' || ev.zone === zoneFiltre);

    if (filtres.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Aucune opportunité pour cette zone pour le moment.</td></tr>';
        return;
    }

    for (let ev of filtres) {
        const row = tbody.insertRow();
        // Colonne Année universitaire
        row.insertCell(0).textContent = ev.annee;
        // Colonne Programme (cliquable)
        const titreCell = row.insertCell(1);
        const lien = document.createElement('a');
        lien.href = ev.urlFiche;
        lien.textContent = ev.titre;
        lien.style.fontWeight = '600';
        lien.style.cursor = 'pointer';
        titreCell.appendChild(lien);
        // Colonne Zone
        row.insertCell(2).textContent = ev.zone;
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const selectZone = document.getElementById('region-select');
    if (selectZone) {
        afficherTableau(selectZone.value);
        selectZone.addEventListener('change', (e) => {
            afficherTableau(e.target.value);
        });
    }

    initButtons();
});

// Gestion des boutons de sauvegarde et partage (pour les fiches individuelles)
function initButtons() {
    // Sauvegarde
    document.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const titre = btn.getAttribute('data-titre');
            const annee = btn.getAttribute('data-date'); // "2025-2026"
            const conditions = btn.getAttribute('data-conditions');
            const url = window.location.href;

            let saved = JSON.parse(localStorage.getItem('bourses_saved')) || [];
            const alreadyExists = saved.some(item => item.url === url);

            if (!alreadyExists) {
                saved.push({ titre, annee, conditions, url });
                localStorage.setItem('bourses_saved', JSON.stringify(saved));
                alert('Fiche sauvegardée avec succès. Vous pourrez la consulter hors ligne.');
            } else {
                alert('Cette fiche est déjà dans vos sauvegardes.');
            }
        });
    });

    // Partage WhatsApp
    document.querySelectorAll('.btn-share').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const titre = btn.getAttribute('data-titre');
            const url = btn.getAttribute('data-url') || window.location.href;
            const message = `*${titre}*%0A%0ADétails : ${url}%0A%0ASource : Bourses Congo`;
            window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    });
}