import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import 'materialize-css';
// @ts-ignore
import {MaterializeAction, MaterializeModule} from 'angular2-materialize';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userList: User[];
  user: User;
  displayedColumns = ['Nombre de Usuario', 'Creado por el Usuario', 'Modificado por el Usuario'];
  selectedRow: number = null;


  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 600, // Transition in duration
    outDuration: 300, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      alert('Ready');
      console.log(modal, trigger);
    },
    complete: () => alert('Closed'), // Callback for Modal close

  };

  constructor(private service: UserService, private authService: AuthService) {
    this.user = new User();
  }


  ngOnInit() {
    this.service.getUserList().subscribe((data: User[]) => {
      console.log(JSON.stringify(data));
      this.userList = data;
    }, (error: Response) => {
      this.handlerError(error);
    });
  }


  private handlerError(error: Response) {
    console.log('error.status: ' + error.status);
    if (error.status === 403) {
      this.authService.closeSession();
    }
  }

  public save() {
    this.service.save(this.user).subscribe((data: boolean) => {
      alert('Datos Guardados Correctamente');
    }, (error) => {
      alert('Hubo un error, detalle' + error);
    });
  }

  public setClickedRow(user: User) {
    if (this.selectedRow !== user.oid) {
      this.selectedRow = user.oid;
      this.user = user;
    } else {
      this.selectedRow = null;
      this.user = new User();
    }
  }


  delete() {
    alert('Estas seguro que deseas eliminar al usuario');
  }
}
