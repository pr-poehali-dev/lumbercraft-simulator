import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface GameObject {
  id: string;
  type: 'human' | 'box' | 'ball' | 'platform';
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  health: number;
  maxHealth: number;
  color: string;
  isDead: boolean;
  isDragging: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  life: number;
  maxLife: number;
}

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('spawn_human');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const GRAVITY = 0.5;
  const FRICTION = 0.98;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  // Создание нового объекта
  const createGameObject = useCallback((type: GameObject['type'], x: number, y: number): GameObject => {
    const id = Math.random().toString(36).substr(2, 9);
    
    const baseObject = {
      id,
      x,
      y,
      velocityX: 0,
      velocityY: 0,
      isDead: false,
      isDragging: false,
    };

    switch (type) {
      case 'human':
        return {
          ...baseObject,
          type: 'human',
          width: 30,
          height: 60,
          health: 100,
          maxHealth: 100,
          color: '#ffdbac',
        };
      case 'box':
        return {
          ...baseObject,
          type: 'box',
          width: 40,
          height: 40,
          health: 50,
          maxHealth: 50,
          color: '#8B4513',
        };
      case 'ball':
        return {
          ...baseObject,
          type: 'ball',
          width: 30,
          height: 30,
          health: 30,
          maxHealth: 30,
          color: '#FF6B6B',
        };
      case 'platform':
        return {
          ...baseObject,
          type: 'platform',
          width: 100,
          height: 20,
          health: 200,
          maxHealth: 200,
          color: '#555',
        };
      default:
        return baseObject as GameObject;
    }
  }, []);

  // Создание частиц
  const createParticles = useCallback((x: number, y: number, color: string, count: number = 5) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random().toString(36).substr(2, 9),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: (Math.random() - 0.5) * 10,
        color,
        life: 60,
        maxLife: 60,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Проверка коллизий
  const checkCollision = useCallback((obj1: GameObject, obj2: GameObject): boolean => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }, []);

  // Нанесение урона
  const damageObject = useCallback((objectId: string, damage: number) => {
    setGameObjects(prev => prev.map(obj => {
      if (obj.id === objectId) {
        const newHealth = Math.max(0, obj.health - damage);
        const isDead = newHealth <= 0;
        
        if (isDead && !obj.isDead) {
          createParticles(obj.x + obj.width/2, obj.y + obj.height/2, '#FF0000', 8);
        }
        
        return { ...obj, health: newHealth, isDead };
      }
      return obj;
    }));
  }, [createParticles]);

  // Физическое обновление
  const updatePhysics = useCallback(() => {
    setGameObjects(prev => prev.map(obj => {
      if (obj.isDragging || obj.type === 'platform') return obj;

      let newX = obj.x + obj.velocityX;
      let newY = obj.y + obj.velocityY;
      let newVelX = obj.velocityX * FRICTION;
      let newVelY = obj.velocityY + GRAVITY;

      // Границы канваса
      if (newX < 0) {
        newX = 0;
        newVelX = -newVelX * 0.5;
      }
      if (newX + obj.width > CANVAS_WIDTH) {
        newX = CANVAS_WIDTH - obj.width;
        newVelX = -newVelX * 0.5;
      }
      if (newY + obj.height > CANVAS_HEIGHT) {
        newY = CANVAS_HEIGHT - obj.height;
        newVelY = -newVelY * 0.5;
        newVelX *= 0.8; // Трение о землю
      }

      return {
        ...obj,
        x: newX,
        y: newY,
        velocityX: Math.abs(newVelX) < 0.1 ? 0 : newVelX,
        velocityY: Math.abs(newVelY) < 0.1 ? 0 : newVelY,
      };
    }));

    // Обновление частиц
    setParticles(prev => prev.map(particle => ({
      ...particle,
      x: particle.x + particle.velocityX,
      y: particle.y + particle.velocityY,
      velocityY: particle.velocityY + 0.2,
      life: particle.life - 1,
    })).filter(particle => particle.life > 0));
  }, []);

  // Обработка клика по канвасу
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool.startsWith('spawn_')) {
      const objectType = selectedTool.replace('spawn_', '') as GameObject['type'];
      const newObject = createGameObject(objectType, x - 20, y - 30);
      setGameObjects(prev => [...prev, newObject]);
    } else if (selectedTool === 'explode') {
      // Взрыв
      gameObjects.forEach(obj => {
        const distance = Math.sqrt((obj.x - x) ** 2 + (obj.y - y) ** 2);
        if (distance < 100) {
          const force = (100 - distance) / 100 * 15;
          const angle = Math.atan2(obj.y - y, obj.x - x);
          
          setGameObjects(prev => prev.map(o => 
            o.id === obj.id ? {
              ...o,
              velocityX: o.velocityX + Math.cos(angle) * force,
              velocityY: o.velocityY + Math.sin(angle) * force,
            } : o
          ));
          
          damageObject(obj.id, Math.floor(force * 2));
        }
      });
      
      createParticles(x, y, '#FFA500', 15);
    } else if (selectedTool === 'damage') {
      // Нанесение урона
      gameObjects.forEach(obj => {
        if (x >= obj.x && x <= obj.x + obj.width && 
            y >= obj.y && y <= obj.y + obj.height) {
          damageObject(obj.id, 25);
          createParticles(x, y, '#FF0000', 3);
        }
      });
    }
  }, [selectedTool, gameObjects, createGameObject, damageObject, createParticles]);

  // Обработка перетаскивания
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setIsMouseDown(true);

    if (selectedTool === 'drag') {
      const clickedObject = gameObjects.find(obj => 
        x >= obj.x && x <= obj.x + obj.width && 
        y >= obj.y && y <= obj.y + obj.height
      );
      
      if (clickedObject) {
        setDraggedObject(clickedObject.id);
        setGameObjects(prev => prev.map(obj => 
          obj.id === clickedObject.id ? { ...obj, isDragging: true } : obj
        ));
      }
    }
  }, [selectedTool, gameObjects]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggedObject && isMouseDown) {
      setGameObjects(prev => prev.map(obj => 
        obj.id === draggedObject ? {
          ...obj,
          x: x - obj.width / 2,
          y: y - obj.height / 2,
          velocityX: (x - mousePos.x) * 0.5,
          velocityY: (y - mousePos.y) * 0.5,
        } : obj
      ));
    }

    setMousePos({ x, y });
  }, [draggedObject, isMouseDown, mousePos]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    if (draggedObject) {
      setGameObjects(prev => prev.map(obj => 
        obj.id === draggedObject ? { ...obj, isDragging: false } : obj
      ));
      setDraggedObject(null);
    }
  }, [draggedObject]);

  // Рендеринг
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка канваса
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Сетка
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // Рендеринг объектов
    gameObjects.forEach(obj => {
      ctx.fillStyle = obj.isDead ? '#666' : obj.color;
      
      if (obj.type === 'ball') {
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + obj.height/2, obj.width/2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      }

      // Человечек - детали
      if (obj.type === 'human' && !obj.isDead) {
        // Голова
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + 10, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Глаза
        ctx.fillStyle = '#000';
        ctx.fillRect(obj.x + obj.width/2 - 3, obj.y + 7, 2, 2);
        ctx.fillRect(obj.x + obj.width/2 + 1, obj.y + 7, 2, 2);
      }

      // Полоса здоровья
      if (obj.health < obj.maxHealth) {
        const healthPercent = obj.health / obj.maxHealth;
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(obj.x, obj.y - 8, obj.width, 4);
        ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
        ctx.fillRect(obj.x, obj.y - 8, obj.width * healthPercent, 4);
      }
    });

    // Рендеринг частиц
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });
  }, [gameObjects, particles]);

  // Игровой цикл
  useEffect(() => {
    const gameLoop = setInterval(() => {
      updatePhysics();
      render();
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [updatePhysics, render]);

  const tools = [
    { id: 'spawn_human', name: 'Человек', icon: 'User' },
    { id: 'spawn_box', name: 'Ящик', icon: 'Package' },
    { id: 'spawn_ball', name: 'Мяч', icon: 'Circle' },
    { id: 'spawn_platform', name: 'Платформа', icon: 'Minus' },
    { id: 'drag', name: 'Перетаскивание', icon: 'Move' },
    { id: 'damage', name: 'Урон', icon: 'Zap' },
    { id: 'explode', name: 'Взрыв', icon: 'Bomb' },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <div className="flex gap-6">
          {/* Панель инструментов */}
          <Card className="w-64 p-4">
            <h2 className="text-xl font-bold mb-4 text-primary">Playground</h2>
            
            <div className="space-y-2 mb-6">
              {tools.map(tool => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <Icon name={tool.icon} size={18} className="mr-2" />
                  {tool.name}
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setGameObjects([])}
              >
                <Icon name="Trash2" size={18} className="mr-2" />
                Очистить
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <div>Объектов: {gameObjects.length}</div>
                <div>Частиц: {particles.length}</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Выберите инструмент</div>
              <div>• Кликните по игровому полю</div>
              <div>• Перетаскивайте объекты</div>
              <div>• Экспериментируйте с физикой!</div>
            </div>
          </Card>

          {/* Игровое поле */}
          <div className="flex-1">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-primary">Physics Playground</h1>
                <div className="text-sm text-muted-foreground">
                  Инструмент: <span className="font-semibold">
                    {tools.find(t => t.id === selectedTool)?.name}
                  </span>
                </div>
              </div>
              
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border border-border rounded-lg bg-white cursor-crosshair"
                onClick={handleCanvasClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;