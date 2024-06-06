Project Work
Una Azienda Commerciale compra degli Item (TItems) da vari  fornitori (TFornitori) e li vende esclusivamente  tramite Amazon. Il tipo di database dove salvare i dati è a scelta.
I campi della TItems devono essere i seguenti (i campi e i tipi di dati sono decisi a priori in quanto forniti da Amazon):
TItems
ASIN (codice di Amazon) (testo) (chiave primaria)
Title (testo)
Giacenza (numero intero).
CategoriaID (Numerico)
Per semplicità gestire solo 4 Categorie in TCategorie:
CategoriaID
Categoria
1
Videogiochi
2
Cartucce per stampanti
3
Caffè Tè e bevande
4
Cavi e Accessori


Per semplicità precaricare solo i seguenti Items (cercare i Title corretti su keepa.com inserendo ASIN o cercarli su Amazon compiando ASIN nel punto giusto dell’URL del prodotto su amazon):
ASIN = B07D9SB7XW 	Minecraft …	CategoriaID=1
ASIN = B0BXWVR4JH	Cartucce Compatibili per HP 305XL 305 XL ….  CategoriaID=2
ASIN = B08KSS6CLT	Tè nero alla Pesca….  CategoriaID=3
ASIN = B008OFEQHQ	Nanocable 10.01.0501 Cavo USB 2 a Micro USB….  CategoriaID=4
ASIN = B08KV9NJVQ	Warner Bros Hogwarts Legacy - PS4…  CategoriaID=1
ASIN = B0BVFR875X	WYFYINK 603XL Cartucce compatibili per Epson 603 XL… CategoriaID=2
ASIN = B01B7NOKZ4 	Estathé Limone, 1.50L, confezione da 6 bottiglie… CategoriaID=3
ASIN = B09L13YT6C 	Minlu Multi Cavo di Ricarica 4A 1Pack 3-in-1 USB… CategoriaID=4
In tutti gli Items inserire una giacenza di 100.

Creare una applicazione Web con le seguenti caratteristiche generali:
WebApi in grado di gestire tutte le chiamate richieste. La tecnologia/linguaggio della WebApi è a scelta.
Frontend web basato su Angular . Chi vuole può usare un altro framework.
La applicazione deve essere online (va fatto il deploy)
Funzionalità/Pagine richieste:
Accesso tramite Email/password  (TUsers): solo gli utenti autorizzati potranno utilizzare l’applicazione.  
Se dopo 30 secondi dall’apertura della pagina di accesso non si preme il pulsante “login” il form viene resettato e si comunica che si è impiegato troppo tempo a fare login
Prevedere una verifica a due passaggi nella fase di login con invio di un codice di verifica  alla mail dell’utente 
Se il login è valido si viene reinviati ad una pagina di benvenuto che permette di accedere alle varie funzionalità della applicazione. Prevedere una autenticazione mediante Token o metodo alternativo a scelta utilizzando altre librerie.  Se l’utente loggato non fa nessuna azione per 15 minuti-> Logout
Per ogni tentativo di accesso memorizzare in una Tabella del database  l’indirizzo IP, data/ora e se l’accesso è valido oppure no.
Una volta loggati prevedere la funzionalità Modifica Password
Prevedere la possibilità di logout
Prevedere la funzionalità “Password dimenticata” 
Prevedere la Possibilità di registrazione di nuovi utenti
L’utente deve compilare Email, Password, ConfermaPassword
Prevedere un controllo lato client:
Obbligo di caricamento di tutti i dati
Validità formale della Email
Password almeno 8 caratteri, una maiuscola e un simbolo 
Password uguale a conferma password
Captcha
Procedura di invio di un link alla mail per la conferma registrazione.
Lato Server:
Verificare che Email non sia già presente nella TUsers
La password deve essere salvata criptata sul database.
Gestire la procedura di registrazione confermata tramite email
Deve essere possibile Caricare/Visualizzare/Modificare/Eliminare TItems e TFornitori
Procedura di aggiornamento della giacenza degli item  in base ai dati delle vendite fornite da una simulazione della  Amazon Selling Partner API:
Importazione  degli Orders effettuando una opportuna chiamata GET   (url che simula una chiamata alla Amazon Selling Partner API reale: https://testbobphp2.altervista.org/projectwork_its_vi/orders.php). Importare in TOrders i dati minimi necessari per effettuare lo scarico magazzino e per le Analisi Grafiche. 
Importazione in TOrderItems degli item legati ad ogni order importato nel punto precedente  effettuando una opportuna chiamata GET che riceve come parametro AmazonOrderID (url che simula una chiamata alla Amazon Selling Partner API reale: https://testbobphp2.altervista.org/projectwork_its_vi/orderitems.php?AmazonOrderID=902-3159896-1390916). Importare in  TOrderItems i dati minimi necessari per effettuare lo scarico magazzino e per le Analisi Grafiche.
Attenzione che ogni giorno le due chiamate del punto precedente potrebbe contenere nuovi Orders e nuovi OrderItems.
La procedura di importazione deve tenere traccia degli Orders  (e relativi OrderItems ) già importati nel database al fine di evitare importazioni multiple
Implementazione dello scarico della giacenza degli item venduti su Amazon. La procedura deve tenere traccia degli Order già scaricati al fine di evitare scarichi magazzino multipli
Creare una procedura di caricamento manuale degli acquisti (TFornitori, TAcquisti e TAcquistiItems) e implementare il carico della giacenza di magazzino per ogni Acquisto.  La procedura deve tenere traccia degli Acquisti già caricati al fine di evitare carichi  magazzino multipli.
TFornitori
FornitoreID		Intero	chiave primaria identity
Fornitore		Testo	
TAcquisti
AcquistoID		Intero	chiave primaria identity
FornitoreID		Intero	
DataFattura		Data	
NumeroFattura	 	Testo
TAcquistiItems
AcquistoItemID		Intero chiave primaria identity
AcquistoID		Intero
ASIN			Intero
QuantitaAcquistata	Intero
PrezzoUnitarioAcquisto  (numero decimale)

L’applicazione permetterà solo di visualizzare (ma non modificare/eliminare/inserire) TOrders  e i relativi Items venduti per ogni Order (TOrderItems)
L’applicazione permetterà di aggiungere/visualizzare/modificare/eliminare i dati presenti in TAcquisti e i relativi Item acquistati per ogni Acquisto (TAcquistiItems)
L’applicazione permetterà di esportare tutte le tabelle in formato Excel/CSV. L’utente deve potere scegliere quali tabelle esportare.
Implementare una o più pagine “Analisi Vendite” (senza utilizzare PowerBI) che fornisce delle analisi numeriche e grafiche sulle vendite su Amazon 
Quantità totali vendute e totale monetario dei ricavi per settimana. Deve essere possibile scegliere la settimana oppure fra due date (Between).
Quantità totali vendute e totale monetario dei ricavi per Item e per settimana. Deve essere possibile la scelta dell’Item e della settimana oppure fra due date (Between).
Quantità totali vendute e totale monetario dei ricavi per Item, per MarketplaceID e per settimana. Deve essere possibile la scelta dell’Item, del MarketplaceID e della settimana oppure fra due date (Between). Il MarketplaceID deve indicare visivamente di quale stato si tratta (Italia, Spagna etc) e non solo il codice alfanumerico del Marketplace
Quantità totali vendute e totale monetario dei ricavi per Item, per MarketplaceID, Categoria e per settimana. Deve essere possibile la scelta dell’Item,  del MarketplaceID, della Categoria e della settimana oppure fra due date (Between). Il MarketplaceID deve indicare visivamente di quale stato si tratta (Italia, Spagna etc) e non solo il codice alfanumerico del Marketplace
Implementare una o più pagine “Analisi Acquisti” (senza utilizzare PowerBI) che fornisce delle analisi numeriche e grafiche sugli acquisti dai fornitori:
Quantità totali Acquistate e totale monetario Acquisti per settimana. Deve essere possibile scegliere la settimana oppure fra due date (Between).
Quantità totali Acquistate e totale monetario  Acquisti per Item e per settimana. Deve essere possibile la scelta dell’Item e della settimana oppure fra due date (Between).
Quantità totali Acquistate e totale monetario  Acquisti per Item e per settimana e per Fornitore. Deve essere possibile la scelta dell’Item, della settimana oppure fra due date (Between) e del Fornitore
Quantità totali Acquistate e totale monetario  Acquisti per Item e per settimana e per Fornitore e per Categoria. Deve essere possibile la scelta dell’Item, della settimana oppure fra due date (Between) , del Fornitore e della Categoria



