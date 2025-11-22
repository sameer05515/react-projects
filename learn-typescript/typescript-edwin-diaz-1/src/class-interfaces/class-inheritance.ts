class Building{
    public windows:string='';
    escalators(){
        console.log('The escalators is moving')
    }
}

class Building2 extends Building{
    escalators(){
        console.log('The escalators is moving from building 2')
    }
}

const building1=new Building();
building1.escalators();

const building2=new Building2();
building2.escalators();