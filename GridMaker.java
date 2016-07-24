import ecs100.*;
import java.util.*;
import java.io.*;
import java.awt.Color;


/*there is a weird structure to this program the interface calls the method redisplay
 * then you make a new GridMaker object in the main method - this is not really important
 * it is just a different way of calling methods
 * 
 * */
 

public class GridMaker {
    
    
    public GridMaker(){
        UI.initialise();
      
        UI.setWindowSize(1000,450);
        this.redisplay();
    }
    
    
    
 // sets grid size eg. 4 rows 7 columns
    private int [][] bookings = new int [7][4];

  

    // constants for the layout of the grid
    public static final int GRID_LEFT = 60;    // left edge of the grid
    public static final int GRID_TOP = 40;     // top edge of the grid
    
    public static final int CELL_WIDTH = 90;   // sets the width of cells in the grid
    public static final int CELL_HEIGHT = 35;  // sets the height of cells in the grid
    
    
    private void redisplay(){
        
        UI.clearGraphics();
       
        for(int i=0; i<this.bookings.length; i++){
            
              
            for(int j=0; j<this.bookings[0].length; j++){
            
              
                int x = GRID_LEFT + i*CELL_WIDTH;   // left of cell
                int y = GRID_TOP + j*CELL_HEIGHT;  // top of cell
                UI.setColor(Color.black);
                
                UI.drawRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                String day = "";
                if(i == 0){day = "Mon";};
                if(i == 1){day = "Tue";};
                if(i == 2){day = "Wed";};
                if(i == 3){day = "Thurs";};
                if(i == 4){day = "Fri";};
                if(i == 5){day = "Sat";};
                if(i == 6){day = "Sun";};
                
                
                
                UI.drawString(day, x+2, y+CELL_HEIGHT/2);
                UI.drawString("jan", x+2, y+CELL_HEIGHT-2);
                
                
                
            }
            
        }
       
         
       
    }
    
   
    public static void main(String[] args) {
        
        new GridMaker();

    }

}