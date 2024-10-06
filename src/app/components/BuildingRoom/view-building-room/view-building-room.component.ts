import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { Building } from '../../../Models/building';


import { BuildingRoom } from '../../../Models/building-room';

@Component({
  selector: 'app-view-building-room',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-building-room.component.html',
  styleUrl: './view-building-room.component.css'
})
export class ViewBuildingRoomComponent {
  building: Building[] = [];
buildingRoom:BuildingRoom[]=[];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getBuilding().subscribe((result) => {
      this.building = result;
      console.log(result);
    });
    
    this.dataSvc.getBuildingRoom().subscribe((result) => {
      this.buildingRoom = result;
      console.log(result);
    });
   
  }

  getBuildingName(id: any) {
    let data = this.building.find((x) => x.buildingId == id);
    return data ? data.buildingName : '';
  }

  confirmDelete(item: BuildingRoom) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteBuildingRoom(Number(item.buildingId)).subscribe(
            (x) => {
              this.notifySvc.success('Data Deleted successfully!!', 'DISMISS');
            },
            (err) => {
              this.notifySvc.fail('Data Delete failed!!', 'DISMISS');
            }
          );
      });
  }
}
