import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const gameFeatures = [
    {
      title: "Крафтинг",
      description: "Создавайте мебель, дома и улучшения из добытой древесины",
      icon: "Hammer",
      progress: 85
    },
    {
      title: "Выживание", 
      description: "Следите за усталостью, голодом и избегайте опасностей леса",
      icon: "Heart",
      progress: 92
    },
    {
      title: "Экосистема",
      description: "Баланс между вырубкой и посадкой новых деревьев",
      icon: "Sprout",
      progress: 78
    },
    {
      title: "Мультиплеер",
      description: "Стройте лесоперерабатывающую империю с друзьями",
      icon: "Users",
      progress: 95
    },
    {
      title: "Прогрессия",
      description: "Развивайте навыки и разблокируйте новые инструменты",
      icon: "TrendingUp",
      progress: 88
    },
    {
      title: "Торговля",
      description: "Продавайте древесину и готовые изделия на рынке",
      icon: "ShoppingCart",
      progress: 90
    }
  ];

  const screenshots = [
    {
      title: "Лесопилка",
      description: "Современное оборудование для переработки"
    },
    {
      title: "Глубокий лес",
      description: "Исследуйте девственные леса"
    },
    {
      title: "Мастерская",
      description: "Создавайте уникальные предметы"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary/5 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="TreePine" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">LumberCraft</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#gameplay" className="text-foreground hover:text-primary transition-colors">Геймплей</a>
              <a href="#characters" className="text-foreground hover:text-primary transition-colors">Персонажи</a>
              <a href="#screenshots" className="text-foreground hover:text-primary transition-colors">Скриншоты</a>
              <a href="#downloads" className="text-foreground hover:text-primary transition-colors">Загрузки</a>
              <a href="#news" className="text-foreground hover:text-primary transition-colors">Новости</a>
              <a href="#community" className="text-foreground hover:text-primary transition-colors">Сообщество</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
              <Icon name="Axe" size={20} className="mr-2" />
              Симулятор лесоруба
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary leading-tight">
              LumberCraft
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Станьте мастером леса в реалистичном симуляторе лесоруба. 
              Рубите деревья, стройте империю, выживайте в дикой природе.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4">
                <Icon name="Play" size={24} className="mr-2" />
                Играть сейчас
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Icon name="Download" size={24} className="mr-2" />
                Скачать демо
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Видов деревьев</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Инструментов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Крафт рецептов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section id="gameplay" className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Игровые механики</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Погрузитесь в мир лесозаготовки с реалистичными механиками и глубокой прогрессией
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Icon name={feature.icon} size={32} className="text-primary" />
                    <Badge variant="secondary">{feature.progress}%</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={feature.progress} className="w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Characters & Tools */}
      <section id="characters" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Персонажи и инструменты</h2>
          </div>

          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="tools" className="text-lg">Инструменты</TabsTrigger>
              <TabsTrigger value="character" className="text-lg">Персонаж</TabsTrigger>
              <TabsTrigger value="skills" className="text-lg">Навыки</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Каменный топор", level: "Начальный", icon: "Axe" },
                  { name: "Стальной топор", level: "Средний", icon: "Wrench" },
                  { name: "Бензопила", level: "Продвинутый", icon: "Zap" },
                  { name: "Лесопилка", level: "Мастер", icon: "Settings" }
                ].map((tool, index) => (
                  <Card key={index} className="text-center hover:shadow-md transition-shadow">
                    <CardHeader>
                      <Icon name={tool.icon} size={48} className="mx-auto text-primary mb-4" />
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge variant="outline">{tool.level}</Badge>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="character" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-primary">Ваш лесоруб</h3>
                  <p className="text-lg text-muted-foreground">
                    Начните путь простого дровосека и станьте владельцем лесоперерабатывающей империи. 
                    Развивайте силу, выносливость и мастерство для покорения самых могучих деревьев.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Zap" size={24} className="text-accent" />
                      <span>Уровень силы влияет на скорость рубки</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Shield" size={24} className="text-accent" />
                      <span>Выносливость определяет время работы</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Target" size={24} className="text-accent" />
                      <span>Точность для эффективных ударов</span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-8 text-center">
                  <Icon name="User" size={120} className="mx-auto text-primary mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Мастер Лесоруб</h4>
                  <p className="text-muted-foreground">Уровень 45</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { skill: "Сила рук", progress: 75, icon: "Dumbbell" },
                  { skill: "Выносливость", progress: 60, icon: "Activity" },
                  { skill: "Торговля", progress: 45, icon: "TrendingUp" },
                  { skill: "Строительство", progress: 80, icon: "Home" }
                ].map((skill, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon name={skill.icon} size={28} className="text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{skill.skill}</h4>
                          <span className="text-sm text-muted-foreground">{skill.progress}/100</span>
                        </div>
                        <Progress value={skill.progress} className="w-full" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Скриншоты игры</h2>
            <p className="text-xl text-muted-foreground">Взгляните на красоту стилизованной графики</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/img/5b5273e9-4f33-4448-a5d8-387f2c10eb0b.jpg" 
                  alt="Лесопилка"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Лесопилка</CardTitle>
                <CardDescription>Современное оборудование для переработки</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/img/005622fc-1122-4dc8-a361-be7ae017263e.jpg" 
                  alt="Глубокий лес"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Глубокий лес</CardTitle>
                <CardDescription>Исследуйте девственные леса</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/img/3474d3e8-ec13-411c-bc27-5e73537096dc.jpg" 
                  alt="Мастерская"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Мастер лесоруб</CardTitle>
                <CardDescription>Станьте профессионалом своего дела</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Загрузки</h2>
            <p className="text-xl text-muted-foreground">Выберите платформу и начните играть</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { platform: "Windows", size: "2.4 ГБ", icon: "Monitor" },
              { platform: "macOS", size: "2.6 ГБ", icon: "Laptop" },
              { platform: "Linux", size: "2.2 ГБ", icon: "Terminal" }
            ].map((download, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name={download.icon} size={48} className="mx-auto text-primary mb-4" />
                  <CardTitle className="text-xl">{download.platform}</CardTitle>
                  <CardDescription>Размер: {download.size}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Новости</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Обновление 2.1: Новые виды деревьев",
                date: "15 января 2024",
                description: "Добавлены секвойи, баобабы и другие экзотические породы"
              },
              {
                title: "Зимний ивент начинается!",
                date: "1 декабря 2023", 
                description: "Специальные задания и уникальные награды до конца января"
              },
              {
                title: "Мультиплеер режим в бета-тесте",
                date: "20 ноября 2023",
                description: "Приглашаем игроков протестировать совместную игру"
              }
            ].map((news, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{news.date}</Badge>
                  <CardTitle className="text-xl">{news.title}</CardTitle>
                  <CardDescription>{news.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Читать далее</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Сообщество</h2>
          <p className="text-xl text-muted-foreground mb-12">Присоединяйтесь к нашему растущему сообществу лесорубов</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { platform: "Discord", members: "15K+", icon: "MessageCircle" },
              { platform: "Reddit", members: "8K+", icon: "MessageSquare" },
              { platform: "Steam", members: "25K+", icon: "Users" },
              { platform: "YouTube", members: "12K+", icon: "Play" }
            ].map((community, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name={community.icon} size={48} className="mx-auto text-primary mb-4" />
                  <CardTitle>{community.platform}</CardTitle>
                  <CardDescription>{community.members} участников</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Присоединиться</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нашей командой разработчиков</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { type: "Поддержка", contact: "support@lumbercraft.com", icon: "HelpCircle" },
              { type: "Пресса", contact: "press@lumbercraft.com", icon: "Newspaper" },
              { type: "Сотрудничество", contact: "partners@lumbercraft.com", icon: "Handshake" },
              { type: "Разработка", contact: "dev@lumbercraft.com", icon: "Code" }
            ].map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name={contact.icon} size={32} className="mx-auto text-primary mb-4" />
                  <CardTitle className="text-lg">{contact.type}</CardTitle>
                  <CardDescription className="break-all">{contact.contact}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Icon name="TreePine" size={32} />
            <h3 className="text-2xl font-bold">LumberCraft</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6">
            © 2024 LumberCraft Studios. Все права защищены.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Условия использования
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              EULA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;