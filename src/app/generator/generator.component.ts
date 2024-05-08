import { Component, ViewChild } from '@angular/core';
import { ColorChromeModule }  from "ngx-color/chrome"
import { FormsModule } from '@angular/forms';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ColorChromeModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {

  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000000'
  backgroundColor: string = '#f9f9fb'

  @ViewChild('memeCanvas', { static: false}) myCanvas: any;
  
  preview(event: any){
      this.fileEvent = event;
      let canvas = this.myCanvas.nativeElement;
      let ctx = canvas.getContext('2d');

      let render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
     
      render.onload = function(event){
        const img = new Image();
        img.src = event.target?.result as string
        img.onload = function(){
          ctx.drawImage(img, 150, 150, 400, 300);
        }
      }
  }


  drawText(){
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    this.preview(this.fileEvent)

    ctx.fillStyle = this.textColor;
    ctx.font = '50px comic sans MS'
    ctx.textAlign = 'center'
    ctx.fillText(this.topText, canvas.width/2, 100)

    let bottomTextHeight = 20; 
    let availableHeight = canvas.height - 20;
    let bottomTextY = Math.min(availableHeight, canvas.height - 20 - bottomTextHeight);
    ctx.fillText(this.bottomText, canvas.width / 2, bottomTextY); 
    
  }

  canvasTextColor($event: ColorEvent){
    this.textColor = $event.color.hex
    this.drawText();
  }

  canvasBgColor($event: ColorEvent){
    this.backgroundColor = $event.color.hex;
    this.drawText();
  } 

  downloadImg(){
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.download = 'memeImg.png';
    link.href = image;
    link.click();


  }


  

}
