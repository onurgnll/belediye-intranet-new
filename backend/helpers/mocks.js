
const books = [
    { name: "Rezonans Kanunu", pageCount: 385, author: "Pierre Franckh", publisher: "Koridor Yayıncılık" },
    { name: "Beni Gözünüzde Büyütmeyin!", pageCount: 385, author: "Gülse Birsel", publisher: "Domingo Yayınevi" },
    { name: "Savaş ve Barış", pageCount: 1225, author: "Lev Tolstoy", publisher: "İş Bankası Kültür Yayınları" },
    { name: "1984", pageCount: 328, author: "George Orwell", publisher: "Can Yayınları" },
    { name: "Suç ve Ceza", pageCount: 430, author: "Fyodor Dostoyevski", publisher: "Yapı Kredi Yayınları" },
    { name: "Kayıp Zamanın İzinde", pageCount: 4215, author: "Marcel Proust", publisher: "YKY" },
    { name: "Yüzüklerin Efendisi", pageCount: 1178, author: "J.R.R. Tolkien", publisher: "İthaki Yayınları" },
    { name: "Küçük Prens", pageCount: 96, author: "Antoine de Saint-Exupéry", publisher: "Can Yayınları" },
    { name: "Sinekler ve İnsanlar", pageCount: 112, author: "John Steinbeck", publisher: "İletişim Yayınları" },
    { name: "Büyük Umutlar", pageCount: 384, author: "Charles Dickens", publisher: "Hep Kitap" },
    { name: "Gülün Adı", pageCount: 636, author: "Umberto Eco", publisher: "Can Yayınları" },
    { name: "Hayvan Çiftliği", pageCount: 112, author: "George Orwell", publisher: "Can Yayınları" },
    { name: "Düşünce Gücüyle Tedavi", pageCount: 233, author: "Joseph Murphy", publisher: "İnkılâp Kitabevi" },
    { name: "Siddhartha", pageCount: 152, author: "Hermann Hesse", publisher: "Can Yayınları" },
    { name: "Baba ve Piç", pageCount: 239, author: "Elif Şafak", publisher: "Doğan Kitap" },
    { name: "İstanbul Hatırası", pageCount: 496, author: "Ahmet Ümit", publisher: "Everest Yayınları" },
    { name: "Kürk Mantolu Madonna", pageCount: 192, author: "Sabahattin Ali", publisher: "Yapı Kredi Yayınları" },
    { name: "Su", pageCount: 235, author: "Burhan Sönmez", publisher: "Can Yayınları" },
    { name: "Beni Asla Bırakma", pageCount: 288, author: "Kazuo Ishiguro", publisher: "İthaki Yayınları" },
    { name: "Yalnızız", pageCount: 144, author: "Peyami Safa", publisher: "Türk Dili" },
    { name: "Ateş ve Kan", pageCount: 486, author: "G. R. R. Martin", publisher: "İthaki Yayınları" },
    { name: "Açlık Oyunları", pageCount: 374, author: "Suzanne Collins", publisher: "Pegasus Yayınları" },
    { name: "Moby Dick", pageCount: 720, author: "Herman Melville", publisher: "İletişim Yayınları" },
    { name: "Yüksek Şatodaki Adam", pageCount: 272, author: "Philip K. Dick", publisher: "İthaki Yayınları" },
    { name: "Karakış", pageCount: 372, author: "Kader Kök", publisher: "Gomedia" },
    { name: "Kral Lear", pageCount: 144, author: "William Shakespeare", publisher: "İstanbul Yayınevi" },
    { name: "Yüzüklerin Efendisi: Yüzük Kardeşliği", pageCount: 480, author: "J.R.R. Tolkien", publisher: "İthaki Yayınları" },
    { name: "Bülbülü Öldürmek", pageCount: 281, author: "Harper Lee", publisher: "Can Yayınları" },
    { name: "Gatsby'nin Büyük Gözleri", pageCount: 180, author: "F. Scott Fitzgerald", publisher: "Can Yayınları" },
    { name: "Zamanın Kısa Tarihi", pageCount: 256, author: "Stephen Hawking", publisher: "Varlık Yayınları" },
    { name: "Mürekkep Yürek", pageCount: 456, author: "Cornelia Funke", publisher: "İthaki Yayınları" },
    { name: "Güzel ve Çirkin", pageCount: 215, author: "Gabrielle-Suzanne Barbot de Villeneuve", publisher: "Can Yayınları" },
    { name: "Harry Potter ve Felsefe Taşı", pageCount: 320, author: "J.K. Rowling", publisher: "Can Yayınları" },
    { name: "Hızlı ve Ölümcül", pageCount: 278, author: "Jo Nesbø", publisher: "Yapı Kredi Yayınları" },
    { name: "Tanrı'nın Kendi Kızı", pageCount: 301, author: "Bernard Cornwell", publisher: "İthaki Yayınları" },
    { name: "The Catcher in the Rye", pageCount: 214, author: "J.D. Salinger", publisher: "Penguin Books" },
    { name: "Yüksek Sesle", pageCount: 215, author: "J.D. Salinger", publisher: "Can Yayınları" },
    { name: "Germinal", pageCount: 528, author: "Émile Zola", publisher: "İthaki Yayınları" },
    { name: "Cevap Yok", pageCount: 402, author: "Clive Cussler", publisher: "İthaki Yayınları" },
    { name: "Sineklerin Tanrısı", pageCount: 304, author: "William Golding", publisher: "İthaki Yayınları" },
    { name: "Savaşın Sonu", pageCount: 221, author: "George R. R. Martin", publisher: "İthaki Yayınları" },
    { name: "Beşinci Mevsim", pageCount: 368, author: "N.K. Jemisin", publisher: "İthaki Yayınları" },
    { name: "Araba Sevdası", pageCount: 216, author: "Recaizade Mahmut Ekrem", publisher: "İstanbul Yayıncılık" },
    { name: "Dracula", pageCount: 416, author: "Bram Stoker", publisher: "Can Yayınları" },
    { name: "Dorian Gray'in Portresi", pageCount: 256, author: "Oscar Wilde", publisher: "İstanbul Yayınevi" },
    { name: "Savaş ve Barış", pageCount: 1225, author: "Lev Tolstoy", publisher: "İş Bankası Kültür Yayınları" },
    { name: "İçimizdeki Şeytan", pageCount: 344, author: "Sabahattin Ali", publisher: "Yapı Kredi Yayınları" },
    { name: "Rüzgarın Gölgesi", pageCount: 416, author: "Carlos Ruiz Zafón", publisher: "İthaki Yayınları" },
    { name: "Yılanların Öcü", pageCount: 220, author: "Fakir Baykurt", publisher: "Yapı Kredi Yayınları" },
    { name: "Aşk ve Gurur", pageCount: 368, author: "Jane Austen", publisher: "Can Yayınları" },
    { name: "Kızıl Yüksek Kule", pageCount: 432, author: "Lian Hearn", publisher: "Can Yayınları" },
    { name: "Hikâyeler", pageCount: 256, author: "Ömer Seyfettin", publisher: "İstanbul Yayıncılık" },
    { name: "Düşüş", pageCount: 368, author: "Michel Houellebecq", publisher: "Doğan Kitap" },
    { name: "Sonsuzluk Çiçeği", pageCount: 304, author: "Rupi Kaur", publisher: "Can Yayınları" },
    { name: "Piranha", pageCount: 384, author: "James Grippando", publisher: "Pegasus Yayınları" },
    { name: "Yüzbaşı", pageCount: 312, author: "Mustafa Kemal Atatürk", publisher: "Güven Yayınları" },
    { name: "Son Akşam Yemeği", pageCount: 320, author: "Dan Brown", publisher: "İthaki Yayınları" },
    { name: "Küçük Kadınlar", pageCount: 448, author: "Louisa May Alcott", publisher: "Can Yayınları" },
    { name: "Cevapsız Çağrı", pageCount: 249, author: "David Gibbins", publisher: "Pegasus Yayınları" },
    { name: "Kara Kış", pageCount: 224, author: "James Grippando", publisher: "Pegasus Yayınları" },
    { name: "Karanlıkta Koşanlar", pageCount: 336, author: "Karin Slaughter", publisher: "Pegasus Yayınları" },
    { name: "Zamanın Kıyısında", pageCount: 512, author: "Margaret Atwood", publisher: "İthaki Yayınları" },
    { name: "Limon Çiçekleri", pageCount: 224, author: "Jalaluddin Rumi", publisher: "İstanbul Yayıncılık" },
    { name: "Rüya", pageCount: 279, author: "Peter Ackroyd", publisher: "Pegasus Yayınları" },
    { name: "Gözlerin Ardında", pageCount: 321, author: "Lynne Reid Banks", publisher: "Doğan Kitap" },
    { name: "Karanlıklar Ülkesi", pageCount: 356, author: "Stephen King", publisher: "Can Yayınları" },
    { name: "Hayatın Sınırlarında", pageCount: 289, author: "John Green", publisher: "Can Yayınları" },
    { name: "Beni Bırakma", pageCount: 378, author: "Colleen Hoover", publisher: "Pegasus Yayınları" },
    { name: "Yapay Zeka ve Gelecek", pageCount: 384, author: "Nick Bostrom", publisher: "İthaki Yayınları" },
    { name: "Gülün Adı", pageCount: 636, author: "Umberto Eco", publisher: "Can Yayınları" },
    { name: "Beni Hatırla", pageCount: 234, author: "Sophie Kinsella", publisher: "Pegasus Yayınları" },
    { name: "Bir Çöküşün Öyküsü", pageCount: 379, author: "Mikhail Bulgakov", publisher: "İthaki Yayınları" },
    { name: "Beyaz Diş", pageCount: 208, author: "Jack London", publisher: "İstanbul Yayıncılık" },
    { name: "Ölüm Yolu", pageCount: 330, author: "Harlan Coben", publisher: "Pegasus Yayınları" },
    { name: "Kayıp Şehir", pageCount: 390, author: "Katherine Webb", publisher: "Pegasus Yayınları" },
    { name: "Yeşil Yol", pageCount: 516, author: "Stephen King", publisher: "Can Yayınları" },
    { name: "Özgürlük Yolu", pageCount: 258, author: "John Steinbeck", publisher: "İletişim Yayınları" },
    { name: "Sihirli Dağ", pageCount: 672, author: "Thomas Mann", publisher: "İstanbul Yayıncılık" },
    { name: "Gömülü Yüzler", pageCount: 415, author: "Jeffrey Archer", publisher: "Pegasus Yayınları" },
    { name: "Kan ve Altın", pageCount: 357, author: "Bernard Cornwell", publisher: "İthaki Yayınları" },
    { name: "Son Akşam Yemeği", pageCount: 320, author: "Dan Brown", publisher: "İthaki Yayınları" },
    { name: "Evimizden Uzakta", pageCount: 369, author: "Diana Gabaldon", publisher: "İthaki Yayınları" },
    { name: "Melekler ve Şeytanlar", pageCount: 616, author: "Dan Brown", publisher: "İthaki Yayınları" },
    { name: "Ölülerin Günü", pageCount: 332, author: "Henning Mankell", publisher: "Can Yayınları" },
    { name: "Altıncı Kısım", pageCount: 215, author: "Khaled Hosseini", publisher: "Doğan Kitap" },
    { name: "Savaşın Sonu", pageCount: 221, author: "George R. R. Martin", publisher: "İthaki Yayınları" },
    { name: "Altıncı Kısım", pageCount: 215, author: "Khaled Hosseini", publisher: "Doğan Kitap" },
    { name: "Yılın Kitabı", pageCount: 405, author: "Margaret Atwood", publisher: "İthaki Yayınları" },
    { name: "Küçük Prens", pageCount: 96, author: "Antoine de Saint-Exupéry", publisher: "Can Yayınları" }
];

module.exports = {
    books
}