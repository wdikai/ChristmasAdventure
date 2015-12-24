function Player(width,height,x,y,image,life)
{
	this.width = width;
	this.height = height;
	this.image = image;
	this.x = x;
	this.y = y;
    this.life = life||0;
    this.ice = 0;
	this.sprite = new Sprite(this.image,[this.x,this.y],[0, 0], [this.width, this.height], 10, [0, 1, 2, 1, 0]);
    this.collision = function collision(objA) {
        if (objA.sprite.entity_pos[0]+objA.width  > this.sprite.entity_pos[0] &&
            objA.sprite.entity_pos[0]             < this.sprite.entity_pos[0]+this.width &&
            objA.sprite.entity_pos[1]+objA.height > this.sprite.entity_pos[1] &&
            objA.sprite.entity_pos[1]             < this.sprite.entity_pos[1]+this.height) {
            return true;
        }
        else {
            return false;
        }
    }
    this.AdditionLife = function()
    {
            if(this.life<3&&this.life>0)
            {
            this.life++;
            return true;
            }
            else
            return false;
    }
}