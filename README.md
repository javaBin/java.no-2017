javabin.github.com - nye java.no
==================

javabin.github.com er repoet for http://java.no.

Siden består av enkle statiske HTML-sider.

Hva trengs gjort med java.no?
-----------------------------

Ønsker du å hjelpe med å utvikle java.no? Ta tak i oppgavene som vi har definert her: https://github.com/javaBin/javabin.github.com/issues


Hvordan legge til nye sider
---------------------------

Sider lastes asynkront med ajax og injectes inn i index.html. For å lage nye sider, opprett en .html-fil under pages/
og link til denne med index.html?page=navn_på_html_fila_uten_extension


Problemer med cross-site scripting i Chrome
-------------------------------------------

Får du problemer med at Chrome ikke tillater HTML-filene å laste via ajax, så kan du starte opp browseren med følgende parameter:

    --allow-file-access-from-files

Det skal fikse problemet.
